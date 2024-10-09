const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

// Database connection (assuming MongoDB)
mongoose.connect('mongodb://localhost:27017/transactionsDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Schema and Model
const transactionSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    isSold: Boolean
});

const Transaction = mongoose.model('Transaction', transactionSchema);

const app = express();
app.use(express.json());

// API to fetch and seed data
app.get('/initialize', async (req, res) => {
    try {
        const { data } = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.insertMany(data);
        res.send('Database initialized with fetched data.');
    } catch (error) {
        res.status(500).send('Error initializing database.');
    }
});

app.get('/transactions', async (req, res) => {
    try {
        const { page = 1, perPage = 10, title, description, price } = req.query;
        
        // Build search filter
        const filter = {};
        if (title) filter.title = new RegExp(title, 'i');
        if (description) filter.description = new RegExp(description, 'i');
        if (price) filter.price = Number(price);
        
        // Paginate results
        const transactions = await Transaction.find(filter)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        
        res.json(transactions);
    } catch (error) {
        res.status(500).send('Error fetching transactions.');
    }
});
app.get('/statistics', async (req, res) => {
    try {
        const { month } = req.query;
        const startDate = new Date(`2023-${month}-01`);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

        const totalSold = await Transaction.aggregate([
            { $match: { dateOfSale: { $gte: startDate, $lte: endDate }, isSold: true } },
            { $group: { _id: null, total: { $sum: '$price' }, soldItems: { $sum: 1 } } }
        ]);

        const totalUnsold = await Transaction.countDocuments({
            dateOfSale: { $gte: startDate, $lte: endDate },
            isSold: false
        });

        res.json({
            totalSaleAmount: totalSold[0]?.total || 0,
            totalSoldItems: totalSold[0]?.soldItems || 0,
            totalUnsoldItems: totalUnsold
        });
    } catch (error) {
        res.status(500).send('Error generating statistics.');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

# transaction-api
A Node.js and MongoDB-based RESTful API for managing product transactions. Features include search, pagination, and monthly statistics for total sales, sold, and unsold items. The API initializes with seed data from a third-party JSON sourceand offers efficient transaction management.


Here’s some detailed information you can use for the **GitHub project description**:

---

### **Project Name**: Transaction API Using Node.js and MongoDB

### **Description**:
This project is a RESTful API built using **Node.js**, **Express**, and **MongoDB** for managing product transactions. It supports the following features:
- **Search and Pagination**: Allows users to search for product transactions by title, description, and price. The results can be paginated for easier navigation.
- **Monthly Statistics**: Provides detailed statistics on the total sales amount, the number of sold items, and unsold items for any given month.
- **Database Initialization**: The API fetches initial data from a third-party JSON source and seeds the MongoDB database.

### **Features**:
- **CRUD operations** on product transactions.
- **Search functionality** based on title, description, and price.
- **Pagination support** for easier viewing of large datasets.
- **Statistics API** to get sales data for specific months.
- **Efficient database structure** for storing transactions.
  
### **Technologies Used**:
- **Node.js** and **Express** for building the API.
- **MongoDB** for data storage.
- **Axios** for fetching third-party data.
- **Mongoose** for object data modeling (ODM).
  
### **How to Use**:
1. Clone the repository.
2. Install dependencies by running `npm install`.
3. Ensure MongoDB is installed and running.
4. Run the server using `node app.js` or `nodemon app.js`.
5. Use tools like Postman or cURL to interact with the API endpoints.

### **API Endpoints**:
1. `GET /initialize`: Initializes the database with data from a third-party API.
2. `GET /transactions`: Lists all transactions with search and pagination support.
3. `GET /statistics`: Provides sales and transaction statistics for a given month.

---

You can include this in your **GitHub README.md** file or as part of the repository’s **description** on GitHub. Let me know if you'd like more specific details or modifications!

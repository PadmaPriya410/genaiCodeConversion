const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const stockController = require("./Controllers/StockController"); // Adjust path as necessary
const saleController = require("./Controllers/SaleController"); // Adjust path as necessary
const reportController = require("./Controllers/ReportController"); // Adjust path as necessary

const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Use the employeeController for routes prefixed with "/employees"
app.use("/api", stockController);
app.use("/api", saleController);
app.use("/api", reportController);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log("MySQL connection failed:", err);
    return;
  }

  console.log("MySQL connected!");
});

app.get("/", (req, res) => {
  res.send("Order Management API is running");
});

app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.log("Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(results);
  });
});

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      error: "Product name and price are required"
    });
  }

  const sql =
    "INSERT INTO products (name, price) VALUES (?, ?)";

  db.query(sql, [name, price], (err, result) => {
    if (err) {
      console.log("Error adding product:", err);
      return res.status(500).json({
        error: "Database error"
      });
    }

    res.status(201).json({
      id: result.insertId,
      name: name,
      price: price
    });
  });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Error deleting product:", err);
      return res.status(500).json({
        error: "Database error"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.log("Login error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Login successful",
      user: results[0]
    });
  });
});

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});
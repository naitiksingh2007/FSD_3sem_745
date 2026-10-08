const express = require("express");

const app = express();

app.use(express.json());

// Product data
let products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 55000,
        quantity: 10
    },
    {
        id: 2,
        name: "Mobile",
        category: "Electronics",
        price: 25000,
        quantity: 20
    },
    {
        id: 3,
        name: "Chair",
        category: "Furniture",
        price: 3000,
        quantity: 15
    }
];


// 1. GET /products
// Display all products
app.get("/products", (req, res) => {
    res.json(products);
});


// 2. GET /products/:id
// Display a particular product
app.get("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product ID not found"
        });
    }

    res.json(product);
});


// 3. POST /products
// Add a new product
app.post("/products", (req, res) => {

    const { name, category, price, quantity } = req.body;

    const newProduct = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        name: name,
        category: category,
        price: price,
        quantity: quantity
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});


// 4. PUT /products/:id
// Update an existing product
app.put("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product ID not found"
        });
    }

    const { name, category, price, quantity } = req.body;

    product.name = name;
    product.category = category;
    product.price = price;
    product.quantity = quantity;

    res.json({
        message: "Product updated successfully",
        product: product
    });
});


// 5. DELETE /products/:id
// Delete a product
app.delete("/products/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product ID not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});


// 6. GET /products/category/:category
// Filter products by category
app.get("/products/category/:category", (req, res) => {

    const category = req.params.category;

    const filteredProducts = products.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredProducts.length === 0) {
        return res.status(404).json({
            message: "Category not found"
        });
    }

    res.json(filteredProducts);
});


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
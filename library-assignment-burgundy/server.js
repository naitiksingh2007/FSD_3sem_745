const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let books = [];
let nextId = 1;

// POST - Add a book
app.post("/books", (req, res) => {
    const { title, author, category } = req.body || {};
    if (![title, author, category].every(value => typeof value === "string" && value.trim())) {
        return res.status(400).send("Please enter title, author and category.");
    }

    books.push({ id: nextId++, title: title.trim(), author: author.trim(), category: category.trim() });
    res.status(201).send("Book Added Successfully");
});

// GET - Get all books
app.get("/books", (req, res) => {
    res.json(books);
});

// PUT - Update a book
app.put("/books/:id", (req, res) => {
    const book = books.find(item => item.id === Number(req.params.id));
    if (!book) return res.status(404).send("Book not found.");

    const { title, author, category } = req.body || {};
    if (![title, author, category].every(value => typeof value === "string" && value.trim())) {
        return res.status(400).send("Please enter title, author and category.");
    }

    book.title = title.trim();
    book.author = author.trim();
    book.category = category.trim();
    res.send("Book Updated Successfully");
});

// DELETE - Delete a book
app.delete("/books/:id", (req, res) => {
    const index = books.findIndex(item => item.id === Number(req.params.id));
    if (index === -1) return res.status(404).send("Book not found.");

    books.splice(index, 1);
    res.send("Book Deleted Successfully");
});

// Start server
app.listen(3011, () => {
    console.log("Server running at http://localhost:3011");
});

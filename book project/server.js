const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/libraryDB")
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });

// Routes
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

// Root route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/book.html");
});

// Serve static files
app.use(express.static("./"));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api/books`);
});

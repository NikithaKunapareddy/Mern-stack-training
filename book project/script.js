const API_URL =
"http://localhost:5000/api/books";

let allBooks = [];
let editingId = null;

// =======================
// LOAD BOOKS ON PAGE LOAD
// =======================

window.onload =
fetchBooks;

// =======================
// ADD OR UPDATE BOOK
// =======================

async function addBook() {

    const title =
    document.getElementById(
    "title"
    ).value;

    const author =
    document.getElementById(
    "author"
    ).value;

    const category =
    document.getElementById(
    "category"
    ).value;

    const price =
    document.getElementById(
    "price"
    ).value;

    const quantity =
    document.getElementById(
    "quantity"
    ).value;

    // validation

    if(
        title === "" ||
        author === "" ||
        category === "" ||
        price === "" ||
        quantity === ""
    ){

        alert(
        "Please fill all fields"
        );

        return;
    }

    const book = {

        title,
        author,
        category,
        price,
        quantity
    };

    try{
        let method = "POST";
        let url = API_URL;

        // If editing, update the URL and method
        if(editingId) {
            method = "PUT";
            url = API_URL + "/" + editingId;
        }

        await fetch(
        url,
        {

            method: method,

            headers: {

                "Content-Type":
                "application/json"
            },

            body:
            JSON.stringify(book)

        });

        alert(
        editingId ? "Book Updated Successfully" : "Book Added Successfully"
        );

        editingId = null;
        document.getElementById("addBtn").innerText = "Add Book";

        clearForm();

        fetchBooks();

    }

    catch(error){

        console.log(error);
    }

}

// =======================
// FETCH BOOKS
// =======================

async function fetchBooks() {

    try{

        const response =
        await fetch(API_URL);

        allBooks =
        await response.json();

        displayBooks(
        allBooks
        );

    }

    catch(error){

        console.log(error);
    }

}

// =======================
// DISPLAY BOOKS
// =======================

function displayBooks(
books
){

    const table =
    document.getElementById(
    "bookTable"
    );

    table.innerHTML = "";

    books.forEach(
    (book) => {

        table.innerHTML +=

        `
        <tr>

            <td>
            ${book.title}
            </td>

            <td>
            ${book.author}
            </td>

            <td>
            ${book.category}
            </td>

            <td>
            ₹${book.price}
            </td>

            <td>
            ${book.quantity}
            </td>

            <td>
            <button class="btn-edit" onclick="loadEditForm('${book._id}')">Edit</button>
            <button class="btn-delete" onclick="deleteBook('${book._id}')">Delete</button>
            </td>

        </tr>
        `;
    });

}

// =======================
// CLEAR FORM
// =======================

function clearForm(){

document.getElementById(
"title"
).value = "";

document.getElementById(
"author"
).value = "";

document.getElementById(
"category"
).value = "";

document.getElementById(
"price"
).value = "";

document.getElementById(
"quantity"
).value = "";

}

// =======================
// EDIT BOOK
// =======================

function loadEditForm(id) {
    const book = allBooks.find(b => b._id === id);
    
    if(book) {
        document.getElementById("title").value = book.title;
        document.getElementById("author").value = book.author;
        document.getElementById("category").value = book.category;
        document.getElementById("price").value = book.price;
        document.getElementById("quantity").value = book.quantity;

        editingId = id;
        document.getElementById("addBtn").innerText = "Update Book";

        window.scrollTo(0, 0);
    }
}

// =======================
// DELETE BOOK
// =======================

async function deleteBook(id) {

    if(!confirm("Are you sure you want to delete this book?")) {
        return;
    }

    try {

        await fetch(
        API_URL + "/" + id,
        {
            method: "DELETE"
        }
        );

        alert("Book Deleted Successfully");
        fetchBooks();

    }

    catch(error) {

        console.log(error);

    }

}

// =======================
// SEARCH/FILTER BOOKS
// =======================

function filterBooks() {

    const searchValue = document.getElementById("searchInput").value.toLowerCase();

    const filteredBooks = allBooks.filter(book => 
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue) ||
        book.category.toLowerCase().includes(searchValue)
    );

    displayBooks(filteredBooks);

}

// ====================================
// BACKEND CODE DOCUMENTATION
// Models->Book.js
// ====================================

/* Example backend code (Node.js/MongoDB):
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});
module.exports =
mongoose.model("Book", bookSchema);

// ====================================
// Folder: routes->books.js 
// ====================================

/* Example backend code (Node.js/Express):
const express =
    require("express");

const router =
    express.Router();

const Book =
    require("../models/Book");

// ===================
// GET BOOKS
// ===================

router.get(
    "/",
    async (req, res) => {
        try {
            const books =
                await Book.find();
            res.status(200)
                .json(books);
        }
        catch (error) {
            res.status(500)
                .json({
                    message:
                        error.message
                });
        }
    });

// ===================
// ADD BOOK
// ===================
router.post(
    "/",
    async (req, res) => {
        try {
            const newBook =
                new Book(req.body);
            const savedBook =
                await newBook.save();
            res.status(201)
                .json(savedBook);
        }
        catch (error) {
            res.status(500)
                .json({
                    message:
                        error.message
                });
        }
    });
module.exports =
    router;

// ====================================
// Outside folder: db.js 
// ====================================

/* Example backend code (Node.js/Express):
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://127.0.0.1:27017/libraryDB"
)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((error) => {
    console.log(error);
});
…………………………………………
Outside folder: 
server.js 
 
// main one
const express =
    require("express");
const cors =
    require("cors");
const app =
    express();
require("./db");
app.use(cors());
app.use(express.json());
app.use(
    express.static("public")
);
// import route
const bookRoutes =
    require("./routes/books");
// connect route
app.use(
    "/api/books",
    bookRoutes
);
app.get("/", (req, res) => {
    res.send(
        "Library Server Running"
    );
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});
*/


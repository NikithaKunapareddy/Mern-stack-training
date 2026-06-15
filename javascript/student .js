function addStudent() {

    // Get values
    let name =
        document.getElementById("name").value;

    let age =
        document.getElementById("age").value;

    let course =
        document.getElementById("course").value;

    // Validation
    if (name === "" ||
        age === "" ||
        course === "") {

        alert("Please fill all fields");
        return;
    }

    // Create card
    let card =
        document.createElement("div");

    card.classList.add("student-card");

    // Add content
    card.innerHTML = `
        <h3>${name}</h3>
        <p>Age: ${age}</p>
        <p>Course: ${course}</p>
        <button class="delete-btn">
            Delete
        </button>
    `;

    // Delete button
    let deleteBtn =
        card.querySelector(".delete-btn");

    deleteBtn.onclick = function () {
        card.remove();
    };

    // Add to page
    document
        .getElementById("studentList")
        .appendChild(card);

    // Clear fields
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
}
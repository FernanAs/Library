const newBookButton = document.querySelector('#new-book');
const form = document.querySelector("#form");
const tableBody = document.querySelector('#table-body');
const checkboxStatus = document.querySelector('#status');

let myLibrary = localStorage.getItem('library') ? JSON.parse(localStorage.getItem('library')) : 
[
    { title: "Ulysses", author: "James Joyce", pages: 730, status: "Unread" },
    { title: "Man's Search for Meaning", author: "Viktor Frankl", pages: 165, status: "Read" },
    { title: " The Odyssey", author: "Homer", pages: 384, status: "Read"}
];

function saveToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

class Book {
    constructor (title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

function render(arrayOfObjects) {
    tableBody.innerHTML = '';
    for (let i = 0; i < arrayOfObjects.length; i++) {
        tableBody.innerHTML += 
                    `<tr index="${i}">
                        <td>${arrayOfObjects[i].title}</td>
                        <td>${arrayOfObjects[i].author}</td>
                        <td>${arrayOfObjects[i].pages}</td>
                        <td>
                            <button class="toggle-button" index-button="${i}">${arrayOfObjects[i].status}</button>
                        </td>
                        <td>
                            <a href="#" style="text-decoration:none" class="delete-button">⌫</a>
                        </td>
                    </tr>`;
    }
}
document.addEventListener('DOMContentLoaded', render(myLibrary));

function showHideElement() {
    const container = document.querySelector("#container");
    if (container.style.display === "none") {
        container.style.display = "block";
        newBookButton.textContent = "New Book";
        newBookButton.style.backgroundColor = "black";
    } else {
        container.style.display = "none";
        newBookButton.textContent = "New Book";
        newBookButton.style.backgroundColor = "black";
    }
}
document.addEventListener('DOMContentLoaded', showHideElement); 
newBookButton.addEventListener('click', showHideElement);

function addBookToLibrary(e) { 
    e.preventDefault();

    title = document.querySelector("#title").value;
    author = document.querySelector("#author").value;
    pages = parseInt(document.querySelector("#pages").value);
    status = document.querySelector("#status").value;

    if (checkboxStatus.checked) {
        status = "Read";
    } else {
        status = "Incomplete";
    }
    
    myLibrary.push(new Book(title, author, pages, status));
    render(myLibrary);
    saveToLocalStorage();
    clearInputs();
}
form.addEventListener('submit', addBookToLibrary);

function clearInputs() {
    document.querySelector("#title").value = '';
    document.querySelector("#author").value = '';
    document.querySelector("#pages").value = 0;
    document.querySelector("#status").value = '';   
}

function deleteRow(event) {
    if (event.target.classList.contains('delete-button')) {
        event.target.parentElement.parentElement.remove();
        const index = event.target.parentElement.parentElement.getAttribute('index');
        myLibrary.splice(index, 1);
        render(myLibrary);
        localStorage.clear();
    }
}

function toggleStatus(event) {
    if (event.target.classList.contains('toggle-button')) {
        let indexOfButton = event.target.getAttribute('index-button');
        if (event.target.innerHTML === "Read") {
            event.target.innerHTML = "Incomplete";
            myLibrary[indexOfButton].status = "Incomplete";
        } else if (event.target.innerHTML === "Incomplete") {
            event.target.innerHTML = "Read";
            myLibrary[indexOfButton].status = "Read";
        }
        localStorage.clear();
        saveToLocalStorage();
    }
}

function deleteRowAndToggleStatus(event) {
    deleteRow(event);
    toggleStatus(event);
}
tableBody.addEventListener('click', deleteRowAndToggleStatus);

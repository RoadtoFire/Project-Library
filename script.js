/* blank library 
Pseudocode
1. Make a blank library object to store the books
2. Make a book constructor object to make books
3. Write a function that creates a book and automatically adds it to the library
4. Write a function that can delete a specific book in the library (based on the id parameter)

*/



const myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID()
};


function addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    
    function bookExists() {
        for (let i = 0; i < myLibrary.length; i++) {
            if ((myLibrary[i].title === newBook.title) && (myLibrary[i].author === newBook.author)) {
                return true;
            }   
       
        }
        return false; 
    };



    if (!bookExists()) {
        myLibrary.push(newBook);
        }

    };



function removeBook(id) {
    const index = myLibrary.findIndex(function (book) {
        return (book.id === id);
    })
    if (index === -1) {
        return false;
    }

    return myLibrary.splice(index, 1);
}



/* DOM Manipulation */

const libraryDisplay = document.getElementById("library-display");

function createCard(book) {
    const BookCardDiv = document.createElement("div");
    BookCardDiv.className = "book-card";
    BookCardDiv.dataset.bookId = book.id;

    const titleCard = document.createElement("h3");
    titleCard.textContent = book.title;

    const authorCard = document.createElement("p");
    authorCard.textContent = `By: ${book.author}`;

    const pagesCard = document.createElement("p");
    pagesCard.textContent = `Pages: ${book.pages}`;

    const readStatusCard = document.createElement("p");
    readStatusCard.textContent = `Status: ${book.read ? "Read": "Not read"}`;


    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";

    removeBtn.addEventListener("click", function() {
        removeBook(book.id);
        render();
    })

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.className = "toggle-btn";

    toggleBtn.addEventListener("click", function() {
        book.read = !book.read;
        render();
    })

    BookCardDiv.appendChild(titleCard);
    BookCardDiv.appendChild(authorCard);
    BookCardDiv.appendChild(pagesCard);
    BookCardDiv.appendChild(readStatusCard);
    BookCardDiv.appendChild(removeBtn);
    BookCardDiv.appendChild(toggleBtn);


    return BookCardDiv;

}


function render() {
    libraryDisplay.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const card = createCard(book)
        libraryDisplay.appendChild(card)
    }
}



const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    
    const author = document.getElementById("author").value;
    
    const pages = Number(document.getElementById("pages").value);
    
    const read = document.getElementById("read").checked;

    addBook(title, author, pages, read);

    render();

    bookForm.reset();
});
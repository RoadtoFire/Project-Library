const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read = read;
};

function addBookToLibrary(title, author, pages, read) {
    const BookCreate = new Book(title, author,pages, read);
    let alreadyExists = false;
    for (let i = 0; i < myLibrary.length; i++) {
        if ((myLibrary[i]["title"] == BookCreate.title) && (myLibrary[i]["author"] == BookCreate.author)) {
            console.log(`${BookCreate.title} is already in the library.`);
            alreadyExists = true;
        };
    };
    if (!alreadyExists) {
            myLibrary.push(BookCreate);
            displayBook(myLibrary)


    };
};

function displayBook(myLibrary) {
    bookBankParent.innerHTML = "";
    myLibrary.forEach(element => {
      const bookDisplay = document.createElement("div");
      bookDisplay.classList.add("book-container");
      const bookTitle = document.createElement("h3");
      bookTitle.textContent = `Title: ${element.title}`;
      const bookAuthor = document.createElement("h4");
      bookAuthor.textContent = `Author: ${element.author}`;
      const bookPages = document.createElement("h4");
      bookPages.textContent = `Number of pages: ${element.pages}`;
      const bookReadStatus = document.createElement("p");
      bookReadStatus.textContent = hasBeenRead(element); 
      bookBankParent.appendChild(bookDisplay);
      bookDisplay.appendChild(bookTitle);
      bookDisplay.appendChild(bookAuthor);
      bookDisplay.appendChild(bookPages);
      bookDisplay.appendChild(bookReadStatus);

      const toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = "Change Read Status";
        toggleReadBtn.addEventListener("click", () => {
            element.read = !element.read;
            displayBook(myLibrary); // Refresh display
        });
        bookDisplay.appendChild(toggleReadBtn);

      const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                myLibrary.splice(index, 1);
                displayBook(myLibrary); // Refresh display
            });
            bookDisplay.appendChild(deleteBtn);  
        
    });
        
};

function hasBeenRead(element) {
    if (element.read) {
        return "You have read this book"
    } else {
        return "Not read yet"
    }
};


const addBookButton = document.querySelector("#addBook");
const dialogButton = document.querySelector("#bookDialog");
const bookBankParent = document.querySelector(".book");
const bookAddForm = document.querySelector("#bookAddForm");
const openForm = document.querySelector("#addBook");
const cancelBtn = document.querySelector("#cancelBtn");

openForm.addEventListener("click", function() {
    dialogButton.showModal();
})



cancelBtn.addEventListener("click", function() {
    dialogButton.close();
});




bookAddForm.addEventListener("submit", function(element) {
    element.preventDefault();
    const title = bookAddForm.elements.book_title.value;
    const author = bookAddForm.elements.book_author.value;
    const pages = bookAddForm.elements.book_pages.value
    const read = bookAddForm.elements.book_read.checked;
    addBookToLibrary(title, author, pages, read);
    bookAddForm.reset();
    dialogButton.close();
});
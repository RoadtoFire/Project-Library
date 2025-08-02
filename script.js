const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID()
    this.read = false
};

function addBookToLibrary(title, author, pages) {
    const BookCreate = new Book(title, author,pages);
    let alreadyExists = false;
    for (let i = 0; i < myLibrary.length; i++) {
        if ((myLibrary[i]["title"] == BookCreate.title) && (myLibrary[i]["author"] == BookCreate.author)) {
            console.log(`${BookCreate.title} is already in the library.`);
            alreadyExists = true;
        };
    };
    if (!alreadyExists) {
            myLibrary.push(BookCreate);
    };
};




console.log(myLibrary)
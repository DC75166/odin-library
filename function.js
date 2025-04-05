// Librarry array to store all books
const library = [];

// Book Cosntructor
function Book(name,author,read){
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.read = read;
}

function addBookToLibrary(){
    const newBook = new Book(name,author,read);
    library.push(newBook);
}

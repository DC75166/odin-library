// Book Cosntructor
class Book { 
    constructor(name,author,pages,read){
        this.id = crypto.randomUUID();
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
    toggleReadStatus() {
        this.read = !this.read;
    }
}

class Library{
    constructor(){
        this.books = [];
    }

    addBookToLibrary(name, author, pages, read){
        const newBook = new Book(name, author, pages, read);
        this.books.push(newBook);
        this.displayBooks();
    }
    
    removeBookFromLibrary(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            this.displayBooks();
        }
    }
    
    togglebookStatus(id) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            book.toggleReadStatus();
            this.displayBooks();
        }
    }
    
    displayBooks() {
    
        const displayArea = document.querySelector('.main');
        displayArea.innerHTML = '';
    
    
        this.books.forEach(book => {
    
            const bookElement = document.createElement('div');
            bookElement.classList.add('book-item');
            bookElement.setAttribute('data-id', book.id);
    
            const booktitle = document.createElement('h3');
            bookElement.classList.add('book-title');
            booktitle.textContent = `${book.name}`;
    
            const bookAuthor = document.createElement('p');
            bookElement.classList.add('book-author');
            bookAuthor.textContent = `Author: ${book.author}`;
    
            const pageNumber = document.createElement('p');
            bookElement.classList.add('page-number');
            pageNumber.textContent = `Number of Pages: ${book.pages}`; 
    
            const bookstatus = document.createElement('p');
            bookElement.classList.add('read');
            bookstatus.textContent = `Read Status: ${book.read ? 'Read' : 'Not Read'}`;
    
            const buttons = document.createElement('div');
            buttons.classList.add('buttons');
    
            const togglebtn = document.createElement('button');
            togglebtn.textContent = 'Toggle Read Status';
            togglebtn.addEventListener('click', () => {
                this.togglebookStatus(book.id);
            });
            
            const removebtn = document.createElement('button');
            removebtn.textContent = 'Remove Book';
            removebtn.addEventListener('click', () => {
                this.removeBookFromLibrary(book.id);
            });
            
            buttons.appendChild(togglebtn);
            buttons.appendChild(removebtn);
    
            bookElement.appendChild(booktitle);
            bookElement.appendChild(bookAuthor);
            bookElement.appendChild(pageNumber);
            bookElement.appendChild(bookstatus);
            bookElement.appendChild(buttons);
    
            displayArea.appendChild(bookElement);
        });
    }
}

const myLibrary = new Library();

document.addEventListener('DOMContentLoaded', () => {

    myLibrary.displayBooks();

    const newbookForm = document.querySelector('.newbookForm');

     newbookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const bookName = document.querySelector('#bookname').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;
        const readStatus = document.querySelector('#read-status').checked;

        if (bookName && author && pages) {
            myLibrary.addBookToLibrary(bookName, author, pages, readStatus);
            newbookForm.reset();

        } else {
            alert('Please fill in all fields.');
        }
    });
});

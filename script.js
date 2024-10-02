const bookForm = document.getElementById('book-form');
const booksList = document.getElementById('books');
const searchInput = document.getElementById('searchInput');

// Load books from local storage
let books = JSON.parse(localStorage.getItem('books')) || [];

// Function to render books
function renderBooks(filter = '') {
    booksList.innerHTML = '';
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(filter.toLowerCase()) || 
        book.author.toLowerCase().includes(filter.toLowerCase())
    );

    filteredBooks.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author}`;
        booksList.appendChild(listItem);
    });

    // Show or hide the list based on the filtered results
    const noBooksMessage = document.createElement('li');
    noBooksMessage.textContent = filteredBooks.length === 0 ? 'No books found' : '';
    booksList.appendChild(noBooksMessage);
}

// Add new book
bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const newBook = { title, author };
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
    renderBooks();
    bookForm.reset();
});

// Search functionality
searchInput.addEventListener('input', function() {
    renderBooks(searchInput.value);
});

// Initial render
renderBooks();
let myLibrary = [];
let bookCount = 0;

const header = document.querySelector("header");
const PopupButton = document.createElement("button");
PopupButton.textContent = "Add Book";
header.appendChild(PopupButton);
PopupButton.onclick = PopUp;
const openForm = document.getElementById("popupForm");

function PopUp() {
  openForm.style.display = "block";
}

function closePopup() {
  openForm.style.display = "none";
}

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = false;
  this.bookId = bookCount;
}
Book.prototype.info = function () {
  console.log(`Title: ${this.title}, Author: ${this.author}`);
};

addBook = () => {
  const titleInputValue = document.getElementById("book-title").value;
  const authorInputValue = document.getElementById("book-author").value;
  const pagesInputValue = document.getElementById("book-pages").value;
  const isReadValue = document.getElementById("book-read");

  bookCount++;
  let book = new Book(titleInputValue, authorInputValue, pagesInputValue);
  isReadValue.checked ? (book.isRead = true) : (book.isRead = false);

  myLibrary.push(book);
  book.info();
  console.table(myLibrary);
  return updateBookGrid(book);
};

function updateBookGrid(book) {
  const bookContent = document.querySelector(".book-content");
  const bookCard = document.createElement("div");

  bookCard.classList.add("book-card");
  bookCard.classList.add(`data-bookId-${bookCount}`);
  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const removeBtn = document.createElement("button");
  const readBtn = document.createElement("button");
  const buttonGrp = document.createElement("div");

  buttonGrp.classList.add("button-group");

  bookRead = (book) => {
    if (book.isRead) {
      readBtn.textContent = "Read";
      return (readBtn.style.backgroundColor = "lightgreen");
    } else {
      readBtn.textContent = "Not Read";
      return (readBtn.style.backgroundColor = "lightsalmon");
    }
  };
  bookRead(book);
  readBtn.classList.add("read-button");
  removeBtn.textContent = "Remove Book";
  removeBtn.classList.add("remove-button");
  removeBtn.onclick = () => removeBook(book);
  readBtn.onclick = () => toggleRead(book);
  bookTitle.textContent = `${book.title}`;
  bookAuthor.textContent = `${book.author}`;
  bookPages.textContent = `Pages: ${book.pages}`;

  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  buttonGrp.appendChild(removeBtn);
  buttonGrp.appendChild(readBtn);
  bookCard.appendChild(buttonGrp);
  bookContent.appendChild(bookCard);
}

function removeBook(book) {
  //remove the book card from html when user deletes the book
  const deleteBook = document.querySelector(`.data-bookId-${book.bookId}`);
  deleteBook.innerHTML = "";
  deleteBook.style.display = "none";
  console.log(`${book.title} removed`);
  myLibrary.splice(myLibrary.indexOf(book), 1);
}

function toggleRead(book) {
  const readBtn = document.querySelector(
    `.data-bookId-${book.bookId} .read-button`
  );
  if (book.isRead) {
    book.isRead = false;
    readBtn.style.backgroundColor = "lightsalmon";
    readBtn.textContent = "Not Read";
  } else {
    book.isRead = true;
    readBtn.textContent = "Read";
    readBtn.style.backgroundColor = "lightgreen";
  }
}

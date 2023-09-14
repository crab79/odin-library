//show the correct read status, change the dialog's style,add a button  to remove the book from the library, add a button to change its read status. 
const adding = document.getElementById("adding");
const addBookDialog = document.getElementById("addBookDialog");
const outputBox = document.getElementsByClassName("content")[0];
const inputEl = addBookDialog.querySelectorAll("input");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const closingButton = document.getElementsByClassName("fi")[0];


// "Show the dialog" button opens the <dialog> modally
adding.addEventListener("click", () => {
  addBookDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
addBookDialog.addEventListener("close", (e) => {
  if (addBookDialog.returnValue !== "default") {
    const outputContainer = document.createElement("div");
    outputContainer.setAttribute("class", "book");


    let newBook = Book(inputEl);
    AddBookToLibrary(newBook);
    TurnIntoHtml(myLibrary, outputContainer);

    // Append the outputContainer to outputBox
    outputBox.appendChild(outputContainer);
  } else {
    outputBox.textContent = "No return value.";
  }
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  addBookDialog.close("confirmed"); // You can send any value here to indicate confirmation
});


const myLibrary = [];

function Book(inputsArray) {
  let bookObj = {
    title: inputsArray[0].value,
    author: inputsArray[1].value,
    page: inputsArray[2].value,
    date: inputsArray[3].value,
    status: inputsArray[4].value,
  }
  return bookObj;
}

function AddBookToLibrary(book) {
  myLibrary.push(book);
}

function TurnIntoHtml(library, container) {
  const latestBook = library[library.length - 1];
  const newClosingButton = closingButton.cloneNode(true);
  const title = document.createElement("h1");
  const author = document.createElement("h3");
  const page = document.createElement("h3");
  const date = document.createElement("h3");
  const statusButton = document.createElement('button');
  const infoClass = document.createElement("div");
  infoClass.setAttribute("class", "info");

  title.textContent = latestBook.title;
  author.textContent = `By ${latestBook.author}`;
  page.textContent = `Page: ${latestBook.page}`;
  date.textContent = `Date: ${latestBook.date}`;
  statusButton.textContent = latestBook.status ? "Read" : "Not yet";

  container.appendChild(newClosingButton);
  container.appendChild(title);
  container.appendChild(infoClass);
  infoClass.appendChild(author);
  infoClass.appendChild(page);
  infoClass.appendChild(date);
  container.appendChild(statusButton);
}



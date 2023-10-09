// change the dialog's style. 
const adding = document.getElementById("adding");
const addBookDialog = document.getElementById("addBookDialog");
const outputBox = document.getElementsByClassName("content")[0];
const inputEl = addBookDialog.querySelectorAll("input");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");
const closingButton = document.getElementsByClassName("fi")[0];
const statusButton = document.getElementById("status");

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
    status: document.querySelector('input[name="read_option"]:checked').value,
  }
  return bookObj;
}

function AddBookToLibrary(book) {
  myLibrary.push(book);
}


function TurnIntoHtml(library, container) {
  const latestBook = library[library.length - 1];
  const closingButton = document.createElement("i");
  const title = document.createElement("h1");
  const author = document.createElement("h3");
  const page = document.createElement("h3");
  const date = document.createElement("h3");
  const statusButton = document.createElement('button');
  const infoClass = document.createElement("div");

  closingButton.setAttribute('class', 'fi fi-br-cross remove-book',);
  infoClass.setAttribute("class", "info");

  closingButton.addEventListener('click', (event) => {
    // 获取当前图书的索引
    const bookIndex = Array.from(myLibrary).indexOf(this);

    // 从数组中移除该图书
    myLibrary.splice(bookIndex, 1);

    // 从 DOM 中移除该图书的容器
    container.parentNode.removeChild(container);
  });
  title.textContent = latestBook.title;
  author.textContent = `By ${latestBook.author}`;
  page.textContent = `Page: ${latestBook.page}`;
  date.textContent = `Date: ${latestBook.date}`;
  if (latestBook.status == "yes") {
    statusButton.textContent = "Read";
    statusButton.setAttribute("id", "status");
    statusButton.setAttribute("class", "read");
  } else if (latestBook.status == "no") {
    statusButton.textContent = "Not yet";
    statusButton.setAttribute("id", "status");
    statusButton.setAttribute("class", "not-yet");
  }

  container.appendChild(closingButton);
  container.appendChild(title);
  container.appendChild(infoClass);
  infoClass.appendChild(author);
  infoClass.appendChild(page);
  infoClass.appendChild(date);
  container.appendChild(statusButton);

  statusButton.addEventListener("click", (event) => {
    if (statusButton.textContent == "Read") {
      statusButton.textContent = "Not yet";
      statusButton.setAttribute("class", "not-yet");
    } else if (statusButton.textContent == "Not yet") {
      statusButton.textContent = "Read";
      statusButton.setAttribute("class", "read");
    }
  })

}

/*
statusButton.addEventListener("click", (event) => {
  if (statusButton.textContent == "Read") {
    statusButton.textContent = "Not yet";
    statusButton.setAttribute("class", "not-yet");
  } else if (statusButton.textContent == "Not yet") {
    statusButton.textContent = "Read";
    statusButton.setAttribute("class", "read");
  }
})
*/
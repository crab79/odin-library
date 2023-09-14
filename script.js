//待辦：用物件方式生成DOM，添加關閉按鈕的功能，改變閱讀狀態
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
    const infoClass = document.createElement("div");
    infoClass.setAttribute("class", "info");
    outputContainer.setAttribute("class", "book");

    addClosingButton(outputContainer);
    addTitle(inputEl[0].value, outputContainer);
    outputContainer.appendChild(infoClass);
    addAuthor(inputEl[1].value, infoClass);
    addPage(inputEl[2].value, infoClass);
    addDate(inputEl[3].value, infoClass);
    addReadingButton(inputEl[4].checked ? "Read" : "Not yet", outputContainer);

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


function addClosingButton(container) {
  const newClosingButton = closingButton.cloneNode(true);
  container.appendChild(newClosingButton);
}

function addReadingButton(content, container) {
  const newButton = document.createElement('button');
  newButton.textContent = content;
  container.appendChild(newButton);
}

function addTitle(content, container) {
  const title = document.createElement("h1");
  title.textContent = content;
  container.appendChild(title);
}

function addPage(content, container) {
  const page = document.createElement("h3");
  page.textContent = "Page: " + content;
  container.appendChild(page);
}

function addDate(content, container) {
  const date = document.createElement("h3");
  date.textContent = "Date: " + content;
  container.appendChild(date);
}

function addAuthor(content, container) {
  const author = document.createElement("h3");
  author.textContent = "By " + content;
  author.setAttribute("id", "author");
  container.appendChild(author);
}

//get the value of the input
const takeInput = function () {
  let inputValue = document.getElementById("text-input").value;
  addToList(inputValue);
  document.getElementById("text-input").value = "";
  document.getElementById("text-input").focus();
};

//giving the item a div
const addToList = function (inputValue) {
  const listSection = document.querySelector("#view-section");
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");
  listSection.appendChild(todoContainer);
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  todoContainer.appendChild(todoText);
  const todoCreatedAt = document.createElement("div");
  todoCreatedAt.classList.add("todo-created-at");
  todoContainer.appendChild(todoCreatedAt);
  const todoPriority = document.createElement("div");
  todoPriority.classList.add("todo-priority");
  todoContainer.appendChild(todoPriority);
  todoText.textContent = inputValue;
  const date = new Date();
  todoCreatedAt.textContent =
    date.getDate() +
    "/" +
    (Number(date.getMonth()) + 1) +
    "/" +
    date.getFullYear() +
    "\n" +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
};

//add button to add the item to the list
const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", takeInput);
//counter element with the current num of items

//sort button to sort the list by priority

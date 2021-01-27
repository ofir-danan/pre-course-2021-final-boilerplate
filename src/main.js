//get the value of the input and his priority
const takeInput = function () {
  let inputValue = document.getElementById("text-input").value;
  let priority = document.getElementById("priority-selector").value;
  document.getElementById("text-input").value = "";
  document.getElementById("text-input").focus();
  addToList(inputValue, priority);
  addCounter();
};

//get the date in more readable way
const getDate = function () {
  const time = new Date();
  const date = `${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()} ${time.getHours()}:${
    time.getMinutes() > 10 ? time.getMinutes() : `0${time.getMinutes()}`
  }:${time.getSeconds() > 10 ? time.getSeconds() : `0${time.getSeconds()}`}`;
  return date;
};

//adding to the counter
const addCounter = function () {
  const counter = document.getElementById("counter");
  counter.textContent = Number(counter.textContent) + 1;
};

//giving the item a div
const addToList = function (inputValue, priority) {
  const listSection = document.querySelector("#view-section");

  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");
  listSection.appendChild(todoContainer);

  const taskCheck = document.createElement("input");
  taskCheck.setAttribute("type", "checkbox");
  taskCheck.className = "taskCheck";
  todoContainer.appendChild(taskCheck);

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
  todoCreatedAt.textContent = getDate();
  todoPriority.textContent = priority;
};

//add button to add the item to the list
const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", takeInput);

//adding item by using enter key
const input = document.getElementById("text-input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
});
//counter element with the current num of items

//sort button to sort the list by priority

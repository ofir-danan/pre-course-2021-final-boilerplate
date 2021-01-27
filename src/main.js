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

  // creating the container div
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");
  listSection.appendChild(todoContainer);

  // adding data-percentage and class to sort them later by priority
  todoContainer.setAttribute("data-percentage", priority);

  // adding a check box
  const taskCheck = document.createElement("input");
  taskCheck.setAttribute("type", "checkbox");
  taskCheck.className = "taskCheck";
  todoContainer.appendChild(taskCheck);

  // adding the text
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  todoContainer.appendChild(todoText);

  // adding the time
  const todoCreatedAt = document.createElement("div");
  todoCreatedAt.classList.add("todo-created-at");
  todoContainer.appendChild(todoCreatedAt);

  // adding the priority
  const todoPriority = document.createElement("div");
  todoPriority.classList.add("todo-priority");
  todoContainer.appendChild(todoPriority);

  //giving the item another class to style him by class
  if (priority === "1") {
    todoContainer.classList.add("top-priority");
  } else if (priority === "2") {
    todoContainer.classList.add("second-priority");
  } else if (priority === "3") {
    todoContainer.classList.add("third-priority");
  } else if (priority === "4") {
    todoContainer.classList.add("fourth-priority");
  } else {
    todoContainer.classList.add("fifth-priority");
  }

  //adding value to each div
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

//adding a sorting function
const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", function () {
  let warpingDiv = $("#view-section");
  warpingDiv
    .find(".todo-container")
    .sort(function (a, b) {
      return +a.dataset.percentage - +b.dataset.percentage;
    })
    .appendTo(warpingDiv);
});

//adding a delete button
const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", function () {
  $(".taskCheck:checked").closest(".todo-container").remove();
});

"use-strict";
// const { Request, default: fetch } = require("node-fetch");
let counter = Number(document.getElementById("counter").innerHTML);
let itemsArray = []; // this array will contain the objects for the localStorage
let BIN_ID = "6016d6030ba5ca5799d1ad5c";
let url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
let geturl = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;

async function putData() {
  const sendObject = {
    "my-todo": itemsArray,
    counter: counter,
  };

  let init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendObject),
  };
  const request = new Request(url, init);
  const response = await fetch(request);
  return response.json();
}

async function getData() {
  let init = {
    method: "GET",
  };
  const request = new Request(geturl, init);
  const response = await fetch(request);
  const body = await response.json();
  console.log(body);
  return body.record["my-todo"];
}

async function getCounter() {
  let init = {
    method: "GET",
  };
  const request = new Request(geturl, init);
  const response = await fetch(request);
  const body = await response.json();
  return body.record.counter;
}

const listSection = document.querySelector("#view-section");

// TODO CONTAINER
const addContainerDiv = function () {
  let inputValue = document.getElementById("text-input").value;
  if (inputValue !== "") {
    let todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    listSection.appendChild(todoContainer);
    addTextDiv(todoContainer);
    addCheckBox(todoContainer);
  }
};

// ADDING CHECK-BOX
const addCheckBox = function (todoContainer) {
  let taskCheck = document.createElement("input");
  taskCheck.setAttribute("type", "checkbox");
  taskCheck.className = "taskCheck";
  todoContainer.appendChild(taskCheck);
};

// TODO TEXT DIV
const addTextDiv = async function (todoContainer) {
  let inputValue = document.getElementById("text-input").value;
  let todoText = document.createElement("div");
  todoText.innerText = inputValue;
  todoText.classList.add("todo-text");
  todoContainer.appendChild(todoText);
  document.getElementById("text-input").value = "";
  document.getElementById("text-input").focus();
  await addDateDiv(todoContainer, inputValue);
};

//TODO DATE DIV
const addDateDiv = async function (todoContainer, inputValue) {
  let todoCreatedAt = document.createElement("div");
  let newDate = getDate();
  todoCreatedAt.innerText = newDate;
  todoCreatedAt.classList.add("todo-created-at");
  todoContainer.appendChild(todoCreatedAt);
  await addPriority(todoContainer, inputValue, newDate);
};

//TODO PRIORITY DIV
const addPriority = async function (todoContainer, inputValue, newDate) {
  let priority = document.getElementById("priority-selector").value;
  let todoPriority = document.createElement("div");
  todoPriority.innerText = priority;
  todoPriority.classList.add("todo-priority");
  todoContainer.appendChild(todoPriority);

  //adding to the counter
  const counterSpan = document.getElementById("counter");
  counter++;
  counterSpan.innerText = counter;

  // adding data-percentage and class to sort them later by priority
  todoContainer.setAttribute("data-percentage", priority);

  //calling a function that will put all the input details in the localStorage
  await addToStorage(inputValue, newDate, priority, counter);
};

// ADD TO LOCALSTORAGE FUNCTION
const addToStorage = async function (inputValue, newDate, priority, counter) {
  let itemsObject = {
    "todo-text": inputValue,
    "todo-created-at": newDate,
    "todo-priority": priority,
  };
  itemsArray.push(itemsObject);
  await putData(itemsArray, counter);
};

// DATE FUNCTION
const getDate = function () {
  let time = new Date();
  let date = `${time.getDate() > 10 ? time.getDate() : `0${time.getDate()}`}-${
    time.getMonth() > 10 ? time.getMonth() : `0${time.getMonth() + 1}`
  }-${time.getFullYear()}   ${time.getHours()}:${
    time.getMinutes() > 10 ? time.getMinutes() : `0${time.getMinutes()}`
  }:${time.getSeconds() > 10 ? time.getSeconds() : `0${time.getSeconds()}`}`;
  return date;
};

// SORT BUTTON
const sortButton = document.getElementById("sort-button");
sortButton.addEventListener("click", function () {
  let warpingDiv = $("#view-section");
  warpingDiv
    .find(".todo-container")
    .sort(function (a, b) {
      return +b.dataset.percentage - +a.dataset.percentage;
    })
    .appendTo(warpingDiv);
});

// DELETE BUTTON
const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", function () {
  let flag = false; //will change once the confirmation will be approved
  let confirmation = false;
  $(".taskCheck").each(async function () {
    if ($(this).is(":checked")) {
      if (!flag) {
        confirmation = confirm("Are you sure you want to delete this items?");
        flag = true;
      }
      if (confirmation === true) {
        //if confirmed continue
        let parent = $(".taskCheck:checked").closest(".todo-container");

        // let newCounterFromJSONBin = await getCounter();
        //taking all the innerText of the div that was selected in order
        //to find the wanted item in the storage
        for (let i = 0; i < parent.length; i++) {
          let newItemsFromJSONBin = await getData();
          //   // getting the values from the localStorage
          let divInnerText = parent[i].innerText;
          //modify the date to look the same
          let arrayDiv = divInnerText.split("\n");
          let declarationDate = arrayDiv[1].split(" ").join("");
          let localStorageIndex = newItemsFromJSONBin;
          let newItems = []; //new array that contains all the un-deleted items
          for (let i = 0; i < localStorageIndex.length; i++) {
            let localValues = Object.values(localStorageIndex[i]);
            //modify the date to look the same
            let declarationDateStorage = localValues[1].split(" ").join("");

            //comparing the strings of the date in order to find the parallel item
            if (declarationDate.localeCompare(declarationDateStorage) !== 0) {
              newItems.push(localStorageIndex[i]);
            }
          }

          //putting the items that use not deleted in the storage
          //   let newItemsJSON = JSON.stringify(newItems);

          //change the counter
          document.getElementById("counter").innerText = newItems.length;
          itemsArray = newItems;
          counter = newItems.length;
          await putData(itemsArray, counter);
        }
        //removing from the page without reload
        $(".taskCheck:checked").closest(".todo-container").remove();
      }
    }
    return;
  });
  if (!confirmation) {
    alert("please select items to delete");
  }
});

//ADD BUTTON FUNCTION
const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addContainerDiv);

//ADDING USING ENTER KEY
const input = document.getElementById("text-input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
});

// this will check if the localStorage contain information and if it is it will print it
window.addEventListener("DOMContentLoaded", async function () {
  let itemsFromJSONBin = await getData();
  let counterFromJSONBin = await getCounter();
  if (counterFromJSONBin === null) return;
  counter = counterFromJSONBin;
  // console.log("4444." + itemsFromJSONBin.length);
  if (itemsFromJSONBin === null) return;
  for (let i = 0; i < itemsFromJSONBin.length; i++) {
    console.log("5555" + itemsFromJSONBin);
    itemsArray = itemsFromJSONBin;
    //add the container div
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    listSection.appendChild(todoContainer);

    // adding data-percentage and class to sort them later by priority
    todoContainer.setAttribute(
      "data-percentage",
      itemsFromJSONBin[i]["todo-priority"]
    );

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

    const counterSpan = document.getElementById("counter");

    todoText.innerText = itemsFromJSONBin[i]["todo-text"];
    todoCreatedAt.innerText = itemsFromJSONBin[i]["todo-created-at"];
    todoPriority.innerText = itemsFromJSONBin[i]["todo-priority"];
    counterSpan.innerText = counterFromJSONBin;
  }
});

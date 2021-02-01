let counter = Number(document.getElementById("counter").innerHTML);
let itemsArray = []; // this array will contain the objects for the localStorage
let BIN_ID = "60173b4d1380f27b1c204fe0";
let PUT_URL = `https://api.jsonbin.io/b/60173b4d1380f27b1c204fe0`;
let GET_URL = `https://api.jsonbin.io/b/60173b4d1380f27b1c204fe0/latest`;

async function setPersistent(data) {
  const sendObject = {
    "my-todo": data,
  };
  const response = await fetch(
    "https://api.jsonbin.io/b/60173b4d1380f27b1c204fe0",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendObject),
    }
  );
  return response.json();
}

async function getPersistent() {
  const response = await fetch(
    `https://api.jsonbin.io/b/60173b4d1380f27b1c204fe0/latest`,
    {
      method: "GET",
    }
  );
  const body = await response.json();
  return body.record;
}

// this will check if the localStorage contain information and if it is it will print it
window.addEventListener("DOMContentLoaded", async function () {
  let fetchData = await getPersistent();
  console.log(fetchData);
  let dataFromJSONBin = result["my-todo"];
  if (dataFromJSONBin.length === 0) return;
  // let dataFromJSONBin["my-todo"] = dataFromJSONBin["my-todo"];
  counter = dataFromJSONBin.length;
  itemsArray = dataFromJSONBin;
  const counterSpan = document.getElementById("counter");
  counterSpan.innerText = dataFromJSONBin.length;
  const listSection = document.querySelector("#view-section");
  for (let i = 0; i < dataFromJSONBin.length; i++) {
    console.log(dataFromJSONBin[i]["todo-text"]);
    //add the container div
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    listSection.appendChild(todoContainer);

    // adding data-percentage and class to sort them later by priority
    todoContainer.setAttribute(
      "data-percentage",
      dataFromJSONBin[i]["todo-priority"]
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

    todoText.innerText = dataFromJSONBin[i]["todo-text"];
    todoCreatedAt.innerText = dataFromJSONBin[i]["todo-created-at"];
    todoPriority.innerText = dataFromJSONBin[i]["todo-priority"];
  }
});

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
const addTextDiv = function (todoContainer) {
  let inputValue = document.getElementById("text-input").value;
  let todoText = document.createElement("div");
  todoText.innerText = inputValue;
  todoText.classList.add("todo-text");
  todoContainer.appendChild(todoText);
  document.getElementById("text-input").value = "";
  document.getElementById("text-input").focus();
  addDateDiv(todoContainer, inputValue);
};

//TODO DATE DIV
const addDateDiv = function (todoContainer, inputValue) {
  let todoCreatedAt = document.createElement("div");
  let newDate = getDate();
  todoCreatedAt.innerText = newDate;
  todoCreatedAt.classList.add("todo-created-at");
  todoContainer.appendChild(todoCreatedAt);
  addPriority(todoContainer, inputValue, newDate);
};

//TODO PRIORITY DIV
const addPriority = function (todoContainer, inputValue, newDate) {
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
  addToStorage(inputValue, newDate, priority, counter);
};

// ADD TO LOCALSTORAGE FUNCTION
const addToStorage = async function (inputValue, newDate, priority, counter) {
  let itemsObject = {
    "todo-text": inputValue,
    "todo-created-at": newDate,
    "todo-priority": priority,
  };
  itemsArray.push(itemsObject);
  await setPersistent(itemsArray);
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

// // DELETE BUTTON
// const deleteButton = document.getElementById("delete-button");
// deleteButton.addEventListener("click", function () {
//   let flag = false; //will change once the confirmation will be approved
//   let confirmation = false;
//   $(".taskCheck").each(async function () {
//     if ($(this).is(":checked")) {
//       if (!flag) {
//         confirmation = confirm("Are you sure you want to delete this items?");
//         flag = true;
//       }
//       if (confirmation === true) {
//         //if confirmed continue
//         let parent = $(".taskCheck:checked").closest(".todo-container");

//         //taking all the innerText of the div that was selected in order
//         //to find the wanted item in the storage
//         for (let i = 0; i < parent.length; i++) {
//           await getData().then((result) => {
//             let newItemsFromJSONBin = result;
//             // getting the values from the localStorage
//             console.log(parent[i].innerText);
//             let divInnerText = parent[i].innerText;
//             //modify the date to look the same
//             let arrayDiv = divInnerText.split("\n");
//             let declarationDate = arrayDiv[1].split(" ").join("");
//             let localStorageIndex = newItemsFromJSONBin;
//             let newItems = []; //new array that contains all the un-deleted items
//             for (let i = 0; i < localStorageIndex.length; i++) {
//               let localValues = Object.values(localStorageIndex[i]);
//               //modify the date to look the same
//               let declarationDateStorage = localValues[1].split(" ").join("");

//               //comparing the strings of the date in order to find the parallel item
//               if (declarationDate.localeCompare(declarationDateStorage) !== 0) {
//                 newItems.push(localStorageIndex[i]);
//               }
//             }

//             //change the counter
//             document.getElementById("counter").innerText = newItems.length;
//             itemsArray = newItems;
//             counter = itemsArray.length;
//           });
//         }
//         //removing from the page without reload
//         $(".taskCheck:checked").closest(".todo-container").remove();
//         await putData(itemsArray);
//       }
//     }
//     return;
//   });
//   if (!confirmation) {
//     alert("please select items to delete");
//   }
// });

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

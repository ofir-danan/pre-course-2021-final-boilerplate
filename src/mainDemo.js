let counter = Number(document.getElementById("counter").innerHTML);
let itemsArray = [];
let doneItemsArray = [];
let BIN_ID = "60173b4d1380f27b1c204fe0";
let DONE_ID = "6017d7cfabdf9c556795e64a";
let PUT_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
let GET_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
let DONE_URL = `https://api.jsonbin.io/v3/b/${DONE_ID}`;
let GET_DONE = `https://api.jsonbin.io/v3/b/${DONE_ID}/latest`;

//JSONbin functions
async function setToBin(data, url) {
  const sendObject = {
    "my-todo": data,
  };
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendObject),
  });
  return response.json();
}

function getFromBin(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      let binArray = response.json();
      return binArray;
    })
    .then((binArray) => {
      return binArray.record["my-todo"];
    });
}

function loading() {
  let spinner = document.getElementById("loading");
  if (spinner.style.display === "none") {
    spinner.style.display = "block";
  } else {
    spinner.style.display = "none";
  }
}
// ON LOAD FUNCTION
window.addEventListener("DOMContentLoaded", async (e) => {
  loading();
  try {
    getFromBin(GET_URL).then((response) => {
      JSONbinLoad(response);
    });
    getFromBin(GET_DONE).then((response) => {
      doneItemsArray.push(response);
    });
  } catch (error) {
    console.error(error);
    alert("opps! something went wrong... error:" + error);
  }
});

//LOAD FROM JSONbin function
let JSONbinLoad = function (response) {
  let dataFromJSONBin = response;
  if (dataFromJSONBin.length === 0) {
    loading();
    return;
  }
  counter = dataFromJSONBin.length;
  itemsArray = dataFromJSONBin;
  const counterSpan = document.getElementById("counter");
  counterSpan.innerText = dataFromJSONBin.length;
  const listSection = document.querySelector("#view-section");
  for (let i = 0; i < dataFromJSONBin.length; i++) {
    //add the container div
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    todoContainer.setAttribute("id", "div" + dataFromJSONBin[i].counter);
    console.log(dataFromJSONBin[i].counter);
    listSection.appendChild(todoContainer);

    // adding data-percentage and class to sort them later by priority
    todoContainer.setAttribute("data-percentage", dataFromJSONBin[i].priority);

    // adding a check box
    const taskCheck = document.createElement("input");
    taskCheck.setAttribute("type", "checkbox");
    taskCheck.setAttribute("id", dataFromJSONBin[i].counter);
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

    todoText.innerText = dataFromJSONBin[i].text;
    todoCreatedAt.innerText = dataFromJSONBin[i].date;
    todoPriority.innerText = dataFromJSONBin[i].priority;
  }
  loading();
};

// TODO TEXT DIV
const addTextDiv = async function () {
  loading();
  let inputValue = document.getElementById("text-input").value;
  inputValue.required = true;
  document.getElementById("text-input").value = "";
  document.getElementById("text-input").focus();
  await addDateDiv(inputValue);
};

//TODO DATE DIV
const addDateDiv = async function (inputValue) {
  let newDate = getDate();
  await addPriority(inputValue, newDate);
};

//TODO PRIORITY DIV
const addPriority = async function (inputValue, newDate) {
  let priority = document.getElementById("priority-selector").value;

  //adding to the counter
  const counterSpan = document.getElementById("counter");
  counter++;
  counterSpan.innerText = counter;

  //calling a function that will put all the input details in the localStorage
  await addToLocalStorage(inputValue, newDate, priority);
};

// ADD TO JSONBIN FUNCTION
const addToLocalStorage = async function (inputValue, newDate, priority) {
  let itemsObject = {
    text: inputValue,
    date: newDate,
    priority: priority,
    counter: counter - 1,
  };
  itemsArray.push(itemsObject);

  try {
    for (let i = 0; i < itemsArray.length - 1; i++) {
      let removeDivs = document.getElementById("div" + itemsArray[i].counter);
      removeDivs.remove();
    }
    setToBin(itemsArray, PUT_URL).then(
      getFromBin(GET_URL).then((response) => {
        JSONbinLoad(response);
      })
    );
  } catch (error) {
    alert(
      "somthing went wrong... your task isn't saved properly. please check your network connection and try again. error:" +
        error
    );
  }
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

//ADD BUTTON FUNCTION
const addButton = document.querySelector("#add-button");
addButton.addEventListener("click", addTextDiv);

//ADDING USING ENTER KEY
const input = document.getElementById("text-input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("add-button").click();
  }
});

// DELETE BUTTON
const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", function () {
  let flag = false; //will change once the confirmation will be approved
  let confirmation = false;
  if (!flag) {
    confirmation = confirm("Are you sure you want to delete this items?");
    flag = true;
  }
  if (confirmation) {
    loading();
    let newArray = [];
    let itemCounter = 0;
    for (let i = 0; i < itemsArray.length; i++) {
      let checkBoxDelete = document.getElementById(itemsArray[i].counter);
      let divDelete = document.getElementById("div" + itemsArray[i].counter);
      console.log(divDelete);
      if (checkBoxDelete.checked) {
        divDelete.remove();
        const counterSpan = document.getElementById("counter");
        counter--;
        counterSpan.innerText = counter;
      } else {
        itemsArray[i].counter = itemCounter;
        newArray.push(itemsArray[i]);
        checkBoxDelete.setAttribute("id", itemCounter);
        divDelete.setAttribute("id", "div" + itemCounter);
        itemCounter++;
      }
    }
    itemsArray = newArray;
    try {
      setToBin(newArray, PUT_URL).then(loading);
    } catch (error) {
      alert(
        "Sorry! we couldn't save your changes... please check your network connection and try again. Error:" +
          error
      );
    }
    return;
  }
  if (!confirmation) {
    alert("please select items to delete");
  }
});

// DONE BUTTON
const doneButton = document.getElementById("done-button");
doneButton.addEventListener("click", function () {
  let flag = false; //will change once the confirmation will be approved
  let confirmation = false;
  if (!flag) {
    confirmation = confirm("Are you sure you finished this tasks?");
    flag = true;
  }
  if (confirmation) {
    let newArray = [];
    let doneArray = [];
    let itemCounter = 0;
    for (let i = 0; i < itemsArray.length; i++) {
      let checkBoxDone = document.getElementById(itemsArray[i].counter);
      let divDone = document.getElementById("div" + itemsArray[i].counter);
      if (checkBoxDone.checked) {
        divDone.style.textDecoration = "line-through";
        doneArray.push(itemsArray[i]);
        setTimeout(divDone.remove(), 4000);
        const counterSpan = document.getElementById("counter");
        counter--;
        counterSpan.innerText = counter;
      } else {
        itemsArray[i].counter = itemCounter;
        newArray.push(itemsArray[i]);
        checkBoxDone.setAttribute("id", itemCounter);
        divDone.setAttribute("id", "div" + itemCounter);
        itemCounter++;
      }
    }
    itemsArray = newArray;
    doneItemsArray.push(doneArray);
    try {
      loading();
      setToBin(newArray, PUT_URL)
        .then(setToBin(doneItemsArray, DONE_URL))
        .then(loading());
    } catch (error) {
      alert(
        "Sorry! we couldn't save your changes... please check your network connection and try again. Error:" +
          error
      );
    }
    return;
  }
  if (!confirmation) {
    alert("please select items to delete");
  }
});

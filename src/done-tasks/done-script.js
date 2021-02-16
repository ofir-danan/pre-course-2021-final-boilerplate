let itemsArray = [];
let DONE_ID = "6017d7cfabdf9c556795e64a";
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
    getFromBin(GET_DONE).then((response) => {
      JSONbinLoad(response);
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
  itemsArray = dataFromJSONBin;
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
      setToBin(newArray, DONE_URL).then(loading);
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

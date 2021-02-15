let itemsArray = []; // this array will contain the objects for the localStorage
let DONE_BIN_ID = "6017d7cfabdf9c556795e64a";
let DONE_URL = `https://api.jsonbin.io/v3/b/${DONE_BIN_ID}`;
let GET_DONE_URL = `https://api.jsonbin.io/v3/b/${DONE_BIN_ID}/latest`;

//JSONbin functions

async function getFromBin() {
  const response = await fetch(GET_DONE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let binArray = await response.json();
  console.log(binArray.record);
  return binArray.record["my-todo"];
}

async function setToDone(data) {
  const sendObject = {
    "my-todo": data,
  };
  const response = await fetch(DONE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendObject),
  });
  return response.json();
}

const listSection = document.querySelector("#view-section");

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
        let localStorageIndex = await getFromBin();
        //taking all the innerText of the div that was selected in order
        //to find the wanted item in the storage
        for (let i = 0; i < parent.length; i++) {
          let divInnerText = parent[i].innerText;
          //modify the date to look the same
          let arrayDiv = divInnerText.split("\n");
          let declarationDate = arrayDiv[1].split(" ").join("");
          let newItems = []; //new array that contains all the un-deleted items
          // for (let i = 0; i < localStorageIndex.length; i++) {
          let localValues = Object.values(localStorageIndex[i]);
          //modify the date to look the same
          let declarationDateStorage = localValues[1].split(" ").join("");

          //comparing the strings of the date in order to find the parallel item
          if (declarationDate.localeCompare(declarationDateStorage) !== 0) {
            newItems.push(localStorageIndex[i]);
          }
          // }
          itemsArray = newItems;
        }

        //removing from the page without reload
        $(".taskCheck:checked").closest(".todo-container").remove();
      }
      setToDone(itemsArray);
    }
    return;
  });
  if (!confirmation) {
    alert("please select items to delete");
  }
});

// ON LOAD FUNCTION
window.addEventListener("DOMContentLoaded", async (e) => {
  try {
    await JSONbinLoad();
  } catch (error) {
    console.error(error);
    alert(error);
  }
});

//LOAD FROM JSONbin function
let JSONbinLoad = async function () {
  let fetchData = await getFromBin();
  let dataFromJSONBin = fetchData;
  if (dataFromJSONBin.length === 0) return;
  itemsArray = dataFromJSONBin;
  const listSection = document.querySelector("#view-section");
  for (let i = 0; i < dataFromJSONBin.length; i++) {
    //add the container div
    const todoContainer = document.createElement("div");
    todoContainer.classList.add("todo-container");
    listSection.appendChild(todoContainer);

    // adding data-percentage and class to sort them later by priority
    todoContainer.setAttribute("data-percentage", dataFromJSONBin[i].priority);

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

    todoText.innerText = dataFromJSONBin[i].text;
    todoCreatedAt.innerText = dataFromJSONBin[i].date;
    todoPriority.innerText = dataFromJSONBin[i].priority;
  }
};

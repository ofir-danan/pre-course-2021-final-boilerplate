const API_KEY = "60173b4d1380f27b1c204fe0"; // Assign this variable to your JSONBIN.io API key if you choose to use it.
const DB_NAME = "my-todo";

// Gets data from persistent storage by the given key and returns it
async function getPersistent(key) {
  return fetch(key, {
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

// Saves the given data into persistent storage by the given key.
// Returns 'true' on success.
async function setPersistent(key, data) {
  const sendObject = {
    "my-todo": data,
  };
  const response = await fetch(key, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendObject),
  });
  return response.json();
  return true;
}

const express = require("express");
const app = express();
const fs = require("fs");
let port = 3000;
app.use(express.json());

//a GET request to /b returns a list of objects

app.get("/b", (request, response) => {
  try {
    const data = fs.readdirSync("./bins/");
    const dataArr = [];
    for (let i = 0; i < data.length; i++) {
      const id = data[i];
      try {
        const dataObj = fs.readFileSync("./bins/" + id, {
          encoding: "utf8",
          flag: "r",
        });
        dataArr.push(JSON.parse(dataObj));
      } catch (err) {
        console.error(err);
      }
    }
    response.send(dataArr);
  } catch (err) {
    console.error(err);
  }
});

//a GET request to /b/{id} returns the details of the object {id}

app.get("/b/:id", (request, response) => {
  const id = request.params.id;
  try {
    const data = fs.readFileSync("./bins/" + id + ".JSON", {
      encoding: "utf8",
      flag: "r",
    });
    response.send(data);
  } catch (err) {
    console.error(err);
  }
});

//a POST request to /b create new object and return the new object (should include unique id)

app.post("/b", (request, response) => {
  const { body } = request;
  try {
    fs.writeFileSync(`./bins/${Date.now()}.json`, JSON.stringify(body));
    response.send("bin added!");
  } catch (err) {
    console.error(err);
  }
});

//a PUT request to /b/{id} get in the body params updated object and return the updated object

app.put("/b/:id", (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const data = fs.readFileSync("./bins/" + id + ".JSON", {
    encoding: "utf8",
    flag: "r",
  });
  const dataObj = JSON.parse(data);
  try {
    const update = Object.assign(dataObj, body);
    fs.writeFileSync(`./bins/${id}.json`, JSON.stringify(update));
    response.send(update);
  } catch (err) {
    console.error(err);
  }
});

//a DELETE request to /b/{id} delete a object

app.delete("/b/:id", (request, response) => {
  const id = request.params.id;
  try {
    fs.unlinkSync(`./bins/${id}.json`);
    response.send("bin removed ");
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log("port loaded");
});

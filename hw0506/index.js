const express = require("express");
const app = express();
const fs = require("fs");
const axios = require("axios")
const myKey='OCNah1lSEmyCAyL/di6c7w==tmxQIx1Uy4PXv6H5';
const apiUrl = 'https://api.api-ninjas.com/v1/cars?limit=10&make=kia'

async function loadCars() {
  const options = {
      method: 'GET',
      url: apiUrl,
      headers: {
        'X-Api-Key': myKey
      }
    };
    try {
        const response = await axios.request(options); 
        const carsArr  = JSON.stringify(response.data);
        appendCarsIntoFile(carsArr);
    } catch (error) {
        console.error(error);
    }
}

async function appendCarsIntoFile(carsData) {
  return new Promise((resolve, reject) => {
      fs.appendFile("./cars.js",`let cars = ${carsData}` ,function (err) {
          if (err) {
              return reject("Error")
          } else {
              return resolve("the file is written down")
          }
      })
  })
}

loadCars()

app.listen(4000, () => {
  console.log("Server is listening");
});

app.use((request, response, next) => {
  const { text } = request.query;
  if (text && text.length <= 20) {
      return next()
  } else if(text){
      response.json({ message: "Rejected! The text must not contain more than 20 characters!" })
  }else{
    next()
  }
})

app.get("/log", (request, response) => {
  const { text } = request.query;
  if (text) {
    response.status(200).send(`&quot;${text}&quot; is appended to file.`);
    appendIntoFile(text);
  } else {
    console.log(err);
    res.status(500).send("Something went veeeeery wrong.");
  }
});

app.get("/log-file", (request, response) => { 
  let fileContent = fs.readFileSync("./log.txt", "utf8");
  return response.status(200).send(fileContent)
})

async function appendIntoFile(someData) {
 
  fs.appendFile("./log.txt", `\n${someData}`, function (err) {
    if (err) {
      console.log (err);
    } else {
        console.log(someData +`is wrote down into the log file`);

    }
  });
}

app.use((error, req, res, next) => {
  console.log(error);
  res
  .status(500)
  .send('Something went wrong...')
 })

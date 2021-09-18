"use strict";

const { readFileSync, writeFileSync } = require("fs");
const express = require("express");
const app = express();

app.listen(3000, console.log("live on port 3000"));

app.get("/", (_req, res) => {
  // readFile count.txt
  const count = readFileSync("./count.txt", "utf-8", (err, _data) => {
    if (err) console.log(err);
  });

  // add +1 in count.txt everytime "/" is loaded
  const newCount = parseInt(count) + 1;

  // writeFile count.txt
  writeFileSync("./count.txt", newCount.toString(), (err) => {
    if (err) console.log(err);
  });

  // send html
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cool Website</title>
      <style>
        h1, p {
          font-weight: 400;
          text-align: center;
        }
        span {
          font-size: 1.2rem;
        }
      </style>
    </head>
    <body>
      <h1>Howdy Stranger!</h1>
      <p>This page has been viewed <span>${newCount}</span> times!</p>
    </body>
    </html>
  `);
});

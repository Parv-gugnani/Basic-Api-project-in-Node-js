const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the root of the API!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.use((req, res, next) => {
  console.log(`Request received at: ${new Date()}`);
  next();
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

app.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`);
});

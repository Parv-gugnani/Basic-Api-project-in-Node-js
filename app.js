// Import the necessary modules
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static(__dirname));

// Create an array to store items
const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];

// Route to get all items
app.get("/items", (req, res) => {
  res.json(items);
});

// Route to get a single item by ID
app.get("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

// Route to create a new item
app.post("/items", (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

// Route to update an item by ID
app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items[itemIndex] = updatedItem;
  res.json(updatedItem);
});

// Route to delete an item by ID
app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items.splice(itemIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

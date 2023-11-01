document.addEventListener("DOMContentLoaded", function () {
  const itemForm = document.getElementById("item-form");
  const itemList = document.getElementById("item-list");

  // Function to fetch and display items
  async function fetchItems() {
    const response = await fetch("http://localhost:3000/items");
    const data = await response.json();

    itemList.innerHTML = "";
    data.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.name;
      itemList.appendChild(li);
    });
  }

  // Event listener for form submission
  itemForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const itemNameInput = document.getElementById("itemName");
    const itemName = itemNameInput.value;

    // Send a POST request to create a new item
    const response = await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: itemName }),
    });

    // Clear the input field
    itemNameInput.value = "";

    // Fetch and display the updated list of items
    fetchItems();
  });

  // Fetch and display items when the page loads
  fetchItems();
});

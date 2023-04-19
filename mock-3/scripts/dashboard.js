let lsData = JSON.parse(localStorage.getItem("orders"));

let tbody = document.querySelector("tbody");
const filterByType = document.querySelector(".filter__type");
const filterBySize = document.querySelector(".filter__size");
const sortByPrice = document.querySelector(".filter__price");
let currentPage = 1;

function paginateData(data, currentPage, rowsPerPage) {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return data.slice(startIndex, endIndex);
}

function getPrice(coffeeType, size) {
  const prices = {
    Cappuccino: { small: 50, medium: 50*2, large: 50*3 },
    Americano: { small: 100, medium: 100*2, large: 100*3 },
    Expresso: { small: 70, medium: 70*2, large: 70*3 },
  };
  return prices[coffeeType][size];
}

const ordersPerPage = 10;
let ordersOnPage = paginateData(lsData, currentPage, ordersPerPage);

// Function to render Data to Dom
function renderData(data) {
  tbody.innerHTML = "";
  data.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.customerName}</td> <td>${item.coffeeType}</td> <td>${item.size}</td> <td>${item.quantity}</td> <td>${item.totalPrice}</td> <td onclick="handleEdit(${index})">Edit</td> <td onclick="handleDelete(${index})">Delete</td>`;

    tbody.append(tr);
  });
}

// Pagination buttons
const previousButton = document.createElement("button");
previousButton.textContent = "Previous";
previousButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    ordersOnPage = paginateData(lsData, currentPage, ordersPerPage);
    renderData(ordersOnPage);
  }
});
document.body.appendChild(previousButton);

const currentButton = document.createElement("button");
previousButton.textContent = `${currentPage}`;
document.body.appendChild(currentButton);

const nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.addEventListener("click", () => {
  const totalPages = Math.ceil(lsData.length / ordersPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    ordersOnPage = paginateData(lsData, currentPage, ordersPerPage);
    renderData(ordersOnPage);
  }
  console.log(totalPages);
});
document.body.appendChild(nextButton);

// Delete Function
const handleDelete = (index) => {
  let lsData = JSON.parse(localStorage.getItem("orders")) || [];
  lsData.splice(index, 1);
  localStorage.setItem("orders", JSON.stringify(lsData));
  ordersOnPage = paginateData(lsData, currentPage, ordersPerPage);
  renderData(ordersOnPage);
};


// Edit Function
const handleEdit = (index) => {
  const item = lsData[index];
  const updatedItem = {
    customerName:
      prompt("Enter customer name", item.customerName) || item.customerName,
    coffeeType: prompt("Enter coffee type", item.coffeeType) || item.coffeeType,
    size: prompt("Enter size", item.size) || item.size,
    quantity:
      parseInt(prompt("Enter quantity", item.quantity)) || item.quantity,
    totalPrice: 0,
  };
  updatedItem.totalPrice =
    updatedItem.quantity * getPrice(updatedItem.coffeeType, updatedItem.size);
  lsData[index] = updatedItem;
  localStorage.setItem("orders", JSON.stringify(lsData));
  ordersOnPage = paginateData(lsData, currentPage, ordersPerPage);
  renderData(ordersOnPage);
};

// FilterOrder
const filterOrders = () => {
  const coffeeTypeInput = filterByType.value;
  const coffeeSizeInput = filterBySize.value;
  let lsData = JSON.parse(localStorage.getItem("orders")) || [];

  if (coffeeTypeInput !== "") {
    lsData = lsData.filter((item) => item.coffeeType === coffeeTypeInput);
  }

  if (coffeeSizeInput !== "") {
    lsData = lsData.filter((item) => item.size === coffeeSizeInput);
  }

  renderData(lsData);
};

// Sort Order
sortByPrice.addEventListener("change", () => {
  const sortOrder = sortByPrice.value;
  let lsData = JSON.parse(localStorage.getItem("orders")) || [];

  if (sortOrder === "asc") {
    lsData = lsData.sort((a, b) => a.totalPrice - b.totalPrice);
  }

  if (sortOrder === "desc") {
    lsData = lsData.sort((a, b) => b.totalPrice - a.totalPrice);
  }

  renderData(lsData);
});

// Event Listener
filterByType.addEventListener("change", filterOrders);
filterBySize.addEventListener("change", filterOrders);

renderData(ordersOnPage);

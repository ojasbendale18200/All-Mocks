const form = document.getElementById("order-form");
const customerName = document.querySelector("#customer__name");
const coffeeType = document.querySelector("#coffee__type");
const size = document.querySelector("#coffee__size");
const quantity = document.querySelector("#quantity");
const totalPrice = document.querySelector("#total__price");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  calculateTotalPrice();

  const order = {
    customerName: customerName.value,
    coffeeType: coffeeType.value,
    size: size.value,
    quantity: quantity.value,
    totalPrice: totalPrice.value,
  };
  saveCoffeeOrder(order);
  form.reset();
  //   window.location.href = "dashboard.html";
});

// Fuction to calculate the total
const calculateTotalPrice = () => {
  const coffeeTypePrice = getCoffeeTypePrice();
  const sizeMulti = getSizeMulti();
  const quantityValue = parseInt(quantity.value);
  const total = coffeeTypePrice * sizeMulti * quantityValue;
  totalPrice.value = total;
};

const getCoffeeTypePrice = () => {
  switch (coffeeType.value) {
    case "Americano":
      return 100;

    case "Expresso":
      return 70;

    case "Cappuccino":
      return 50;
    default:
      return 0;
  }
};

const getSizeMulti = () => {
  switch (size.value) {
    case "small":
      return 1;

    case "medium":
      return 2;

    case "large":
      return 3;
    default:
      return 0;
  }
};

// Save the data in LocalStorage
const saveCoffeeOrder = (order) => {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
};

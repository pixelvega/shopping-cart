"use strict";
const ENDPOINT =
  "https://raw.githubusercontent.com/pixelvega/shopping-cart/scripts/_src/assets/data/cart.json?token=ApiB9u_KYumImzYD_NXri1oPXGYJRl8Tks5cq36gwA%3D%3D";
let data = [
  {
    id: "0",
    name: "Vans - zapatillas classic slip on",
    size: "36",
    price: 36.5,
    image: "assets/images/image-01_2019-04-06/image-01@2x.jpg",
    date: "Mon Apr 08 2019 18:43:45 GMT+0200 (Central European Summer Time)",
    units: 1
  },
  {
    id: "1",
    name: "Vans - zapatillas classic slip on",
    size: "35",
    price: 35.5,
    image: "assets/images/image-02/image-01@2x.jpg",
    date: "Mon Apr 08 2019 18:43:45 GMT+0200 (Central European Summer Time)",
    units: 1
  },
  {
    id: "2",
    name: "Vans - zapatillas classic slip on",
    size: "36",
    price: 36.6,
    image: "assets/images/image-03/image-01@2x.jpg",
    date: "Mon Apr 08 2019 18:43:45 GMT+0200 (Central European Summer Time)",
    units: 1
  },
  {
    id: "3",
    name: "Nike - classic urban",
    size: "42",
    price: 42.2,
    image: "assets/images/image-01_2019-04-06/image-01@2x.jpg",
    date: "Mon Apr 08 2020 18:43:45 GMT+0200 (Central European Summer Time)",
    units: 1
  },
  {
    id: "4",
    name: "New Balance - zapatillas",
    size: "39",
    price: 39.9,
    image: "assets/images/image-01_2019-04-06/image-01@2x.jpg",
    date: "Mon Apr 08 2020 18:43:45 GMT+0200 (Central European Summer Time)",
    units: 1
  },
  {
    id: "5",
    name: "Adidas",
    size: "27",
    price: 27.5,
    image: "assets/images/image-01_2019-04-06/image-01@2x.jpg",
    date: "Mon Apr 08 2020 18:43:45 GMT+0200 (Central European Summer Time)",
    units: 1
  }
];
let productsByDates = [];

const cartArticlesEl = document.querySelector(".cart__articles");
const cartTotal = document.querySelector(".cart__total-sum-number");
const cartTotalArticles = document.querySelector(".cart__title-num");

const getResults = () => {
  // fetch(ENDPOINT)
  //   .then(resp => resp.json())
  //   .then(data => {
  //     showResults(data);
  //   });
  setTimeout(() => {
    orderData(data);
  }, 0);
};

const getTotalAmount = data => {
  let total = 0;
  for (const item of data) {
    total += item.price * item.units;
  }
  cartTotal.innerHTML = total.toFixed(2);
};
const getTotalArticles = data => {
  let totalArticles = 0;
  for (const item of data) {
    totalArticles += item.units;
  }
  cartTotalArticles.innerHTML = totalArticles;
};

const orderData = data => {
  let deliveryDates = [];
  for (let i = 0; i < data.length; i++) {
    let product = data[i];
    let indexArr = deliveryDates.indexOf(product.date);
    if (indexArr < 0) {
      deliveryDates.push(product.date);
      productsByDates[deliveryDates.length - 1] = [];
      productsByDates[deliveryDates.length - 1].push(product);
    } else {
      productsByDates[indexArr].push(product);
    }
  }

  showResults(productsByDates);
};

const showResults = productsByDates => {
  getTotalAmount(data);
  getTotalArticles(data);
  let listItems = "";
  let cartList = "";
  let header = "";
  let template = "";
  let date = "";
  for (let i = 0; i < productsByDates.length; i++) {
    date = productsByDates[i][i].date;
    header = `
    <ul class="cart__list">
      <h5 class="cart__articles-delivery">${date}</h5>
    `;
    for (let j = 0; j < productsByDates[i].length; j++) {
      template = `
      <li id="${productsByDates[i][j].id}" class="cart__item">
        <div class="cart__item-wrapper">
          <div class="cart__item-img-box">
            <img
              class="cart__item-img"
              src="${productsByDates[i][j].image}"
              alt="${productsByDates[i][j].name}"
            />
          </div>
          <p class="cart__item-title">
            <a class="cart__item-title">${productsByDates[i][j].name}</a>
          </p>
          <p class="cart__item-size">Talla: <span class="cart__item-size-number">${
            productsByDates[i][j].size
          }</span></p>
          <p class="cart__item-price">
            <span class="cart__item-price-text hidden">Price:</span>
            <span class="cart__item-price-number">${
              productsByDates[i][j].price
            }</span>€
          </p>
          <div class="cart__item-quantity-controls">
            <button class="btn cart__quantity-btn btn-plus" data-id="${
              productsByDates[i][j].id
            }" data-price="${productsByDates[i][j].price}" data-units="${
        productsByDates[i][j].units
      }">
              <i class="fas fa-plus"></i>
            </button>
            <div class="cart__item-quantity">
              <span class="cart__item-quantity-number">${
                productsByDates[i][j].units
              }</span>
            </div>
            <button class="btn cart__quantity-btn btn-minus" data-id="${
              productsByDates[i][j].id
            }" data-price="${productsByDates[i][j].price}" data-units="${
        productsByDates[i][j].units
      }">
              <i class="fas fa-minus"></i>
            </button>
          </div>
          <button class="btn cart__item-btn-remove" data-id="${
            productsByDates[i][j].id
          }">
            <i class="far fa-trash-alt"></i>
            <span class="cart__item-btn-remove-text hidden">Eliminar</span>
          </button>
        </div>
      </li>`;

      listItems += template;
      if (j === productsByDates[i].length - 1) {
        cartList += header + listItems + "</ul>";
        listItems = "";
      }
    }
    cartArticlesEl.innerHTML = cartList;
  }
  addListeners();
};

const addListeners = () => {
  const btnsPlus = document.querySelectorAll(".btn-plus");
  const btnsMinus = document.querySelectorAll(".btn-minus");
  const btnsRemove = document.querySelectorAll(".cart__item-btn-remove");
  for (const btn of btnsMinus) {
    btn.addEventListener("click", handleMinus);
  }
  for (const btn of btnsPlus) {
    btn.addEventListener("click", handlePlus);
  }
  for (const btn of btnsRemove) {
    btn.addEventListener("click", handleRemoveItem);
  }
};
const handleMinus = e => {
  const itemId = e.currentTarget.getAttribute("data-id");
  const itemPrice = e.currentTarget.getAttribute("data-price");
  if (data[itemId].units - 1 > 0) {
    --data[itemId].units;

    orderData(data);
  }
};
const handlePlus = e => {
  const itemId = e.currentTarget.getAttribute("data-id");
  const itemPrice = e.currentTarget.getAttribute("data-price");
  ++data[itemId].units;

  orderData(data);
};

const handleRemoveItem = e => {
  const itemId = e.currentTarget.getAttribute("data-id");

  for (let i = 0; i < data.length; i++) {
    if (data[i].id.indexOf(itemId) !== -1) {
      data.splice(i, 1);
    }
  }

  orderData(data);
};

getResults();

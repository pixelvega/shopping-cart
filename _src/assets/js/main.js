"use strict";
const ENDPOINT = "assets/data/cart.json";
let data = [];
let productsByDates = [];

const cartArticlesEl = document.querySelector(".cart__articles");
const cartSubtotal = document.querySelector(".cart__subtotal-sum");
const cartTotal = document.querySelector(".cart__total-sum-number");
const cartTotalArticles = document.querySelector(".cart__title-num");
const itemQuantity = document.querySelector(".cart__item-quantity-number");

const getResults = () => {
  fetch(ENDPOINT)
    .then(resp => resp.json())
    .then(results => {
      data = results;
      groupDataByDates(data);
    });
};

const groupDataByDates = data => {
  let deliveryDates = [];
  productsByDates = [];

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
  if (productsByDates.length <= 0) {
    cartArticlesEl.innerHTML = cartList;
  } else {
    for (let i = 0; i < productsByDates.length; i++) {
      date = productsByDates[i][i].date;
      header = `
      <ul class="cart__list">
        <h5 class="cart__articles-delivery">Entrega ${date}</h5>
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
              }">
                <i class="fas fa-plus cart__quantity-icon"></i>
              </button>
              <div class="cart__item-quantity">
                <span class="cart__item-quantity-number cart__item-quantity-number${
                  productsByDates[i][j].id
                }" data-id="${productsByDates[i][j].id}">${
          productsByDates[i][j].units
        }</span>
              </div>
              <button class="btn cart__quantity-btn btn-minus" data-id="${
                productsByDates[i][j].id
              }" data-price="${productsByDates[i][j].price}" data-units="${
          productsByDates[i][j].units
        }">
                <i class="fas fa-minus cart__quantity-icon"></i>
              </button>
            </div>
            <button class="btn cart__item-btn-remove" data-id="${
              productsByDates[i][j].id
            }">
              <i class="far fa-trash-alt"></i>
              <span class="cart__item-btn-remove-text">Eliminar</span>
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
  const itemQuantity = document.querySelector(`span[data-id="${itemId}"]`);

  for (const item of data) {
    if (item.id === itemId && item.units - 1 > 0) {
      --item.units;
      itemQuantity.innerHTML = item.units;
    }
  }

  getTotalAmount(data);
  getTotalArticles(data);
};

const handlePlus = e => {
  const itemId = e.currentTarget.getAttribute("data-id");
  const itemQuantity = document.querySelector(`span[data-id="${itemId}"]`);
  for (const item of data) {
    if (item.id === itemId) {
      ++item.units;
      itemQuantity.innerHTML = item.units;
    }
  }

  getTotalAmount(data);
  getTotalArticles(data);
};

const getTotalAmount = data => {
  let subtotal = 0;
  let total = 0;

  for (const item of data) {
    subtotal += item.price * item.units;
  }
  if (subtotal === 0) {
    total = 0;
  } else {
    total = subtotal - (subtotal * 30) / 100;
  }

  cartSubtotal.innerHTML = subtotal.toFixed(2);
  cartTotal.innerHTML = total.toFixed(2);
};

const getTotalArticles = data => {
  let totalArticles = 0;
  for (const item of data) {
    totalArticles += item.units;
  }

  cartTotalArticles.innerHTML = totalArticles;
};

const handleRemoveItem = e => {
  const itemId = e.currentTarget.getAttribute("data-id");

  const itemEl = document.getElementById(`${itemId}`);
  const parentEl = itemEl.parentNode;
  for (const item of data) {
    if (item.id === itemId) {
      parentEl.removeChild(itemEl);
    }
  }

  if (parentEl.children.length <= 1) {
    parentEl.parentNode.removeChild(parentEl);
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].id.indexOf(itemId) !== -1) {
      data.splice(i, 1);
    }
  }

  getTotalAmount(data);
  getTotalArticles(data);
};

getResults();

//event when toggle visibility of cart

const btnCartEl = document.querySelector(".header__icon-bag");
const cartSection = document.querySelector(".page__cart");
const mainSection = document.querySelector(".page__main");
const mainContainer = document.querySelector(".main__container");

const slideCart = () => {
  cartSection.classList.toggle("slide-cart");
  mainSection.classList.toggle("page__main-overflow");
  mainContainer.classList.toggle("main__overlay");
};

btnCartEl.addEventListener("click", slideCart);

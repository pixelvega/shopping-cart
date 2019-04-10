"use strict";
const ENDPOINT = "assets/data/cart.json";
let data = [];
let productsByDates = [];

const cartArticlesEl = document.querySelector(".cart__articles");
const cartSubtotal = document.querySelector(".cart__subtotal-sum");
const cartTotal = document.querySelector(".cart__total-sum-number");
const cartTotalArticles = document.querySelector(".cart__title-num");

const btnCartEl = document.querySelector(".header__icon-bag");
const cartSection = document.querySelector(".page__cart");
const mainSection = document.querySelector(".page__main");
const mainContainer = document.querySelector(".main__container");

const getResults = () => {
  fetch(ENDPOINT)
    .then(resp => resp.json())
    .then(results => {
      data = results;
      groupDataByDates(data);
    });
};

const getTotalAmount = data => {
  let total = 0;
  let discount = 10;
  for (const item of data) {
    total += item.price * item.units;
  }
  cartSubtotal.innerHTML = total.toFixed(2);
  cartTotal.innerHTML = total.toFixed(2) - discount;
};
const getTotalArticles = data => {
  let totalArticles = 0;
  for (const item of data) {
    totalArticles += item.units;
  }

  cartTotalArticles.innerHTML = totalArticles;
};

const groupDataByDates = data => {
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
            }" data-price="${productsByDates[i][j].price}" data-units="${
        productsByDates[i][j].units
      }">
              <i class="fas fa-plus cart__quantity-icon"></i>
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

  if (data[itemId].units - 1 > 0) {
    --data[itemId].units;

    groupDataByDates(data);
  }
};

const handlePlus = e => {
  const itemId = e.currentTarget.getAttribute("data-id");

  ++data[itemId].units;

  groupDataByDates(data);
};

const handleRemoveItem = e => {
  const itemId = e.currentTarget.getAttribute("data-id");
  const itemEl = document.getElementById(`${itemId}`);
  const parentEl = itemEl.parentNode;

  parentEl.removeChild(itemEl);

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
  groupDataByDates(data);
};

getResults();

const slideCart = () => {
  cartSection.classList.toggle("slide-cart");
  mainSection.classList.toggle("page__main-overflow");
  mainContainer.classList.toggle("main__overlay");
};

btnCartEl.addEventListener("click", slideCart);

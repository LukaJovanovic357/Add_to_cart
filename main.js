'use strict';
import getProducts from './getProducts.js';

/* Selected elements */
const listProductEl = document.querySelector('.listProduct');
const iconEl = document.querySelector('.icon-cart');
const listCartEl = document.querySelector('.listCart');
const closeEl = document.querySelector('.close');
const cartProductsCountEl = document.querySelector('.cartProductsCount');
/* Selected elements */

/* Products data */
const products = await getProducts();
const cart = [];
/* Products data */

/* Functions defined */
const renderProducts = () => {
    listProductEl.innerHTML = '';
    products.forEach(product => {
        listProductEl.innerHTML += `
        <div class="item" data-id='${product.id}'>
          <img src="${product.image}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <div class="price">$${product.price}</div>
          <button class="addCart">Add To Cart</button>
        </div>
    `;
    });
};

const renderCartProducts = () => {
    listCartEl.innerHTML = '';
    cart.forEach(product => {
        listCartEl.innerHTML += `
          <div class="item" data-id='${product.id}'>
            <div class="image">
                <img src="${product.image}" alt="chair" />
            </div>
            <div class="name">${product.name}</div>
            <div class="total-price">$${product.price * product.quantity}</div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${product.quantity}</span>
                <span class="plus">></span>
            </div>
          </div>
    `;
    });
};

const addProductToCart = productId => {
    cartProductsCountEl.innerHTML++;
    const productInCart = cart.find(p => p.id === productId);

    if (productInCart) {
        productInCart.quantity++;
    } else {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({
                ...product,
                quantity: 1
            });
        }
    }
    renderCartProducts();
};

const updateCartProductQuantity = (productId, action) => {
    const productInCart = cart.find(p => p.id === productId);

    if (productInCart) {
        if (action === 'plus') {
            productInCart.quantity++;
            cartProductsCountEl.innerHTML++;
        } else if (action === 'minus') {
            productInCart.quantity--;
            cartProductsCountEl.innerHTML--;
            if (productInCart.quantity <= 0) {
                cart.splice(cart.indexOf(productInCart), 1);
            }
        }
    }

    renderCartProducts();
};

/* Functions defined */

/* Event listeners */
iconEl.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('showCart');
});

closeEl.addEventListener('click', () => {
    document.querySelector('body').classList.toggle('showCart');
});

listProductEl.addEventListener('click', event => {
    if (event.target.classList.contains('addCart')) {
        const selectedProduct = event.target.closest('.item');
        const productId = Number(selectedProduct.dataset.id);
        addProductToCart(productId);
    }
});

listCartEl.addEventListener('click', event => {
    if (event.target.classList.contains('plus')) {
        const selectedProduct = event.target.closest('.item');
        const productId = Number(selectedProduct.dataset.id);
        updateCartProductQuantity(productId, 'plus');
    } else if (event.target.classList.contains('minus')) {
        const selectedProduct = event.target.closest('.item');
        const productId = Number(selectedProduct.dataset.id);
        updateCartProductQuantity(productId, 'minus');
    }
});

/* Event listeners */

renderProducts();

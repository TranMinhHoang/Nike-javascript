import {
    listData,
    setLocalStorage,
    getLocalStorage,
    keyLocalStorageListSP,
} from "./common.js";
import { addSP } from "./cart.js";

// Bai 2
setLocalStorage(keyLocalStorageListSP, listData);

// Bai 3
const listProductHtml = document.querySelector(".product-list");

const goToHomeHtml = document.querySelectorAll('.scr-go-home')

// bai 6
const navbarCartHtml = document.querySelector("#cart");
const navbarHomeHtml = document.querySelector("#home");
const homePageHtml = document.querySelector(".home-page");
const cartPageHtml = document.querySelector(".cart-page");

const getListData = () => {
    const listData = getLocalStorage(keyLocalStorageListSP);
    const product = listData.map(
        (data) =>
            `<li class="product-item" value="${data.id}" >
        <img class="product-img" src='${data.image}' alt="" >
        <button class="product-add-cart">
            <i class="fa-solid fa-cart-plus"></i>
        </button>
        <h4 class="product-name">${data.name}</h4>
        <div class="product-status">
            <p class="product-price">$${data.price}</p>
            <p class="product-quantity">Quantity: ${data.quantity}</p>
        </div >
    </li>`
    );
    listProductHtml.innerHTML = product.join("");
    const addBtnHtml = document.querySelectorAll(".product-add-cart");
    addBtnHtml.forEach((btn) => {
        btn.onclick = () => {
            addSP(btn.parentElement.value);
        };
    });
};
getListData();

const goToHomePage = () => {
    homePageHtml.classList.remove("hidden");
    cartPageHtml.classList.add("hidden");
    navbarHomeHtml.classList.add("active");
    navbarCartHtml.classList.remove("active");
    getListData();
};

goToHomeHtml.forEach(element => {
    element.onclick = () => {
        goToHomePage()
    }
})


export default getListData;

import {
    listData,
    setLocalStorage,
    getLocalStorage,
    keyLocalStorageListSP,
} from "./common.js";
import { addSP } from "./cart.js";


const listProductHtml = document.querySelector(".product-list");
const goToHomeHtml = document.querySelectorAll('.scr-go-home')
const navbarCartHtml = document.getElementById("cart");
const navbarHomeHtml = document.getElementById("home");
const navbarBillHtml = document.getElementById("bill");
const homePageHtml = document.querySelector(".home-page");
const cartPageHtml = document.querySelector(".cart-page");
const BillPageHtml = document.querySelector(".bill-page");
const footerHtml = document.querySelector(".footer")
const menuBtnHtml = document.querySelector(".header-mobile-menu")
const menuMobileHtml = document.querySelector(".navbar-list")

// setLocalStorage(keyLocalStorageListSP, listData);
// const _listData = getLocalStorage(keyLocalStorageListSP)

const getListData = () => {
    const _listData = getLocalStorage(keyLocalStorageListSP).length === 0 ? listData : getLocalStorage(keyLocalStorageListSP);
    setLocalStorage(keyLocalStorageListSP, _listData)
    const product = _listData.map(
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
    navbarCartHtml.classList.remove("active");
    navbarBillHtml.classList.remove("active");
    navbarHomeHtml.classList.add("active");

    homePageHtml.classList.remove("hidden");
    cartPageHtml.classList.add("hidden");
    BillPageHtml.classList.add("hidden");
    footerHtml.classList.remove("hidden");
    getListData();
};

const closeMenuMobile = () => {
    menuMobileHtml.classList.add('hide-on-mobile')
}

goToHomeHtml.forEach(element => {
    element.onclick = () => {
        goToHomePage()
        closeMenuMobile()
    }
})

menuBtnHtml.onclick = () => {
    menuMobileHtml.classList.toggle('hide-on-mobile')
}


export { goToHomePage, closeMenuMobile};

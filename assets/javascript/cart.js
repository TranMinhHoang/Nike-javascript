import { listData, getLocalStorage, setLocalStorage, keyLocalStorageItemCart, getParentElement } from "./common.js";
import { openModalWarning, openModalDeleteProduct } from "./modal.js";

const listCart = getLocalStorage(keyLocalStorageItemCart);
const countCartHtml = document.querySelector(".navbar-item-notice");
const navbarCartHtml = document.getElementById("cart");
const navbarHomeHtml = document.getElementById("home");
const navbarBillHtml = document.getElementById('bill')
const homePageHtml = document.querySelector(".home-page");
const cartPageHtml = document.querySelector(".cart-page");
const billPageHtml = document.querySelector(".bill-page");
const footerHtml = document.querySelector(".footer")
const existingCartHtml = document.querySelector(".existing-cart");
const emptyCartHtml = document.querySelector(".empty-cart");
const buyCartHtml = document.querySelector(".total-price-cart");
const listCartHtml = document.querySelector(".cart-list");
const totalPriceHtml = document.querySelector(".total-price-cart-text");

const cart = {
    idSP: null,
    soLuong: 0,
};

const priceCart = new Map();

const addSP = (id) => {
    const newCart = { ...cart };
    newCart.idSP = id;
    const oldCart = listCart.find((cart) => cart.idSP === id);
    const infoItem = listData.find((data) => data.id === id);
    if (oldCart) {
        oldCart.soLuong < infoItem.quantity ? oldCart.soLuong++ : openModalWarning() 
    } else {
        newCart.soLuong = 1;
        listCart.push(newCart);
    }
    setLocalStorage(keyLocalStorageItemCart, listCart);
    handlePriceCart();
};

const countCart = () => {
    if (listCart.length === 0) {
        countCartHtml.classList.add("hidden");
    } else {
        countCartHtml.classList.remove("hidden");
        countCartHtml.innerHTML = listCart.length;
    }
};

const handlePriceCart = () => {
    const total = listCart.reduce((total, curr) => {
        const infoCurr = listData.find((product) => product.id === curr.idSP);
        const totalPriceSP = infoCurr.price * curr.soLuong;
        priceCart.set(curr.idSP, totalPriceSP);
        total = total + totalPriceSP;
        return total;
    }, 0);
    priceCart.set("total", total);
    countCart();
};
handlePriceCart();

const detailCart = () => {
    const detailListCart = []
    listCart.map(cart => {
        const infoProduct = listData.find(product => cart.idSP === product.id);
        const detailItem = {
            id: infoProduct.id,
            name: infoProduct.name,
            image: infoProduct.image,
            quantity: infoProduct.quantity,
            buyCount: cart.soLuong,
            subPrice: infoProduct.price,
            totalPrice: priceCart.get(infoProduct.id)
        }
        detailListCart.push(detailItem);
    })
    return detailListCart;
};

const goToCartPage = () => {
    navbarCartHtml.classList.add("active");
    navbarHomeHtml.classList.remove("active");
    navbarBillHtml.classList.remove("active");
    homePageHtml.classList.add("hidden");
    billPageHtml.classList.add("hidden");
    cartPageHtml.classList.remove("hidden");
    footerHtml.classList.add("hidden");

    if (listCart.length > 0) {
        emptyCartHtml.classList.add("hidden");
        existingCartHtml.classList.remove("hidden");
        buyCartHtml.classList.remove("hidden");
        
        const detailItemCart = detailCart()
        const itemCart = detailItemCart.map(cart => (
            `<li class="cart-item" value="${cart.id}">
            <div class="cart-item-info">
                <img class="cart-item-img" src="${cart.image}" alt="">
                <div>
                    <h1 class="cart-item-name">${cart.name}</h1>
                    <p class="cart-item-quantity">Quantity: ${
                        cart.quantity
                    }</p>
                </div>
            </div>
            <div class="cart-item-states">
                <div class="cart-item-state">
                    <i onclick="minusItem(${
                        cart.id
                    })" class="plus-minus-icon fa-solid fa-minus"></i>
                    ${cart.buyCount}
                    <i onclick="plusItem(${
                        cart.id
                    })" class="plus-minus-icon fa-solid fa-plus"></i>
                </div>
                <div class="cart-item-state">$${cart.subPrice}</div>
                <div class="cart-item-state">$${cart.totalPrice}</div>
                <div class="cart-item-state">
                    <i class="clear-item-icon fa-regular fa-circle-xmark"></i>
                </div>
            </div>
        </li>`
        ))
        listCartHtml.innerHTML = itemCart.join(" ");
        totalPriceHtml.innerHTML = "total: $" + priceCart.get("total");
        const minusCountHtml = document.querySelectorAll('.fa-minus')
        const plusCountHtml = document.querySelectorAll('.fa-plus')
        const clearItemHtml = document.querySelectorAll('.clear-item-icon')
        
        minusCountHtml.forEach((item) => {
            item.onclick = () => {
                minusItem(getParentElement(item, 'li').value);
            };
        });

        plusCountHtml.forEach((item) => {
            item.onclick = () => {
                plusItem(getParentElement(item, 'li').value);
            };
        });

        clearItemHtml.forEach((item) => {
            item.onclick = () => {
                removeItem(getParentElement(item, 'li').value);
            };
        });
        
    } else {
        existingCartHtml.classList.add("hidden");
        buyCartHtml.classList.add("hidden");
        emptyCartHtml.classList.remove("hidden");
    }
    
};

navbarCartHtml.onclick = function() {
    goToCartPage()
}

const plusItem = (id) => {
    const item = listCart.find((cart) => cart.idSP === id);
    const infoItem = listData.find((data) => data.id === item.idSP);
    if (item.soLuong < infoItem.quantity) {
        item.soLuong++;
        setLocalStorage(keyLocalStorageItemCart, listCart);
        handlePriceCart();
        goToCartPage();
    } else {
        openModalWarning()
    }
};

const minusItem = (id) => {
    const item = listCart.find((cart) => cart.idSP === id);
    if (item.soLuong === 0) {
        removeItem(id);
    } else {
        item.soLuong = item.soLuong - 1;
        setLocalStorage(keyLocalStorageItemCart, listCart);
        handlePriceCart();
        goToCartPage();
    }
};

const removeItem = (id) => {
    openModalDeleteProduct(id)
};

export { addSP, priceCart, detailCart, handlePriceCart, goToCartPage, listCart }
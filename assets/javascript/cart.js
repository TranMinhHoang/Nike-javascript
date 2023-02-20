import { listData, getLocalStorage, setLocalStorage, keyLocalStorageItemCart } from "./common.js";
// Bai 4
const listCart = getLocalStorage(keyLocalStorageItemCart);

// bai 5
const countCartHtml = document.querySelector(".navbar-item-notice");

const cart = {
    idSP: null,
    soLuong: 0,
};

const addSP = (id) => {
    const newCart = { ...cart };
    newCart.idSP = id;
    const oldCart = listCart.find((cart) => cart.idSP === id);
    if (oldCart) {
        oldCart.soLuong++;
    } else {
        newCart.soLuong = 1;
        listCart.push(newCart);
    }
    setLocalStorage(keyLocalStorageItemCart, listCart);
    handlePriceCart();
};

// Bai 5
const priceCart = new Map();

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

// Bai 6
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

const plusItem = (id) => {
    const item = listCart.find((cart) => cart.idSP === id);
    const infoItem = listData.find((data) => data.id === item.idSP);
    if (item.soLuong < infoItem.quantity) {
        item.soLuong++;
        setLocalStorage(keyLocalStorageItemCart, listCart);
        handlePriceCart();
        goToCartPage();
    }
};

const minusItem = (id) => {
    const item = listCart.find((cart) => cart.idSP === id);
    if (item.soLuong === 0) {
        removeItem(item.id);
    } else {
        item.soLuong = item.soLuong - 1;
        setLocalStorage(keyLocalStorageItemCart, listCart);
        handlePriceCart();
        goToCartPage();
    }
};

const removeItem = (id) => {
    const indexItem = listCart.findIndex((cart) => cart.idSP === id);
    listCart.splice(indexItem, 1);
    setLocalStorage(keyLocalStorageItemCart, listCart);
    handlePriceCart();
    goToCartPage();
};

export {addSP, listCart, priceCart, plusItem, minusItem, removeItem, detailCart}
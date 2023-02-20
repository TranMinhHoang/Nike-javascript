import getListData from "./home.js";
import { listCart, priceCart, plusItem, minusItem, removeItem, detailCart } from "./cart.js";
import { listData } from "./common.js";

// bai 6
const navbarCartHtml = document.querySelector("#cart");
const navbarHomeHtml = document.querySelector("#home");
const homePageHtml = document.querySelector(".home-page");
const cartPageHtml = document.querySelector(".cart-page");
const existingCartHtml = document.querySelector(".existing-cart");
const emptyCartHtml = document.querySelector(".empty-cart");
const buyCartHtml = document.querySelector(".total-price-cart");
const listCartHtml = document.querySelector(".cart-list");
const totalPriceHtml = document.querySelector(".total-price-cart-text");

const goToHomePage = () => {
    homePageHtml.classList.remove("hidden");
    cartPageHtml.classList.add("hidden");
    navbarHomeHtml.classList.add("active");
    navbarCartHtml.classList.remove("active");
    getListData();
};

navbarHomeHtml.onclick = function () {
    goToHomePage();
};

const goToCartPage = () => {
    homePageHtml.classList.add("hidden");
    navbarHomeHtml.classList.remove("active");
    cartPageHtml.classList.remove("hidden");
    navbarCartHtml.classList.add("active");

    if (listCart.length > 0) {
        emptyCartHtml.classList.add("hidden");
        existingCartHtml.classList.remove("hidden");
        buyCartHtml.classList.remove("hidden");

        const detailItemCart = detailCart()

        const itemCart = detailItemCart.map(cart => (
            `<li class="cart-item">
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
                    <i onclick="removeItem(${
                        cart.id
                    })" class="clear-item-icon fa-regular fa-circle-xmark"></i>
                </div>
            </div>
        </li>`
        ))

        // const itemCart = listCart.map((cart) => {
        //     const infoProduct = listData.find(
        //         (product) => cart.idSP === product.id
        //     );

        //     return `<li class="cart-item">
        //     <div class="cart-item-info">
        //         <img class="cart-item-img" src="${infoProduct.image}" alt="">
        //         <div>
        //             <h1 class="cart-item-name">${infoProduct.name}</h1>
        //             <p class="cart-item-quantity">Quantity: ${
        //                 infoProduct.quantity
        //             }</p>
        //         </div>
        //     </div>
        //     <div class="cart-item-states">
        //         <div class="cart-item-state">
        //             <i onclick="minusItem(${
        //                 infoProduct.id
        //             })" class="plus-minus-icon fa-solid fa-minus"></i>
        //             ${cart.soLuong}
        //             <i onclick="plusItem(${
        //                 infoProduct.id
        //             })" class="plus-minus-icon fa-solid fa-plus"></i>
        //         </div>
        //         <div class="cart-item-state">$${infoProduct.price}</div>
        //         <div class="cart-item-state">$${priceCart.get(cart.idSP)}</div>
        //         <div class="cart-item-state">
        //             <i onclick="removeItem(${
        //                 infoProduct.id
        //             })" class="clear-item-icon fa-regular fa-circle-xmark"></i>
        //         </div>
        //     </div>
        // </li>`;
        // });
        listCartHtml.innerHTML = itemCart.join(" ");
        totalPriceHtml.innerHTML = "total: $" + priceCart.get("total");
        

    } else {
        existingCartHtml.classList.add("hidden");
        buyCartHtml.classList.add("hidden");
        emptyCartHtml.classList.remove("hidden");
    }
    
};

navbarCartHtml.onclick = function() {
    goToCartPage()
}

export { goToHomePage, goToCartPage };

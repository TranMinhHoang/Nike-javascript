// Bai 1
const listData = [
    {
        id: 1,
        name: "Nike Air Max 97",
        image: "./assets/images/home/NikeAirMax97.webp",
        price: 300,
        quantity: 10,
    },
    {
        id: 2,
        name: "Nike Air Force 1",
        image: "./assets/images/home/NikeAirForce1.jfif",
        price: 400,
        quantity: 20,
    },
    {
        id: 3,
        name: "Nike Streakfly Road Racing Shoes",
        image: "./assets/images/home/NikeStreakflyRoadRacingShoes.png",
        price: 300,
        quantity: 15,
    },
    {
        id: 4,
        name: "Nike Alphafly 2",
        image: "./assets/images/home/NikeAlphafly2.png",
        price: 400,
        quantity: 13,
    },
    {
        id: 5,
        name: "Nike Dunk",
        image: "./assets/images/home/NikeDunk.png",
        price: 100,
        quantity: 4,
    },
    {
        id: 6,
        name: "Nike Air Max Plus",
        image: "./assets/images/home/NikeAirMaxPlus.webp",
        price: 500,
        quantity: 7,
    },
];

const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHIMTEMCART";

// bai 3
const listProductHtml = document.querySelector(".product-list");

// bai 5
const countCartHtml = document.querySelector(".navbar-item-notice");

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

// bai 7
const modalHtml = document.querySelector(".modal");

// bai 9
const listDistrictHtml = document.querySelector("#district");
const listWardHtml = document.querySelector("#ward");

// Bai 2
const setListData = (() => {
    localStorage.setItem(keyLocalStorageListSP, JSON.stringify(listData));
})();

// Bai 3
const getListData = () => {
    const listData = JSON.parse(localStorage.getItem(keyLocalStorageListSP));
    const product = listData.map(
        (data) =>
            `<li class="product-item">
        <img class="product-img" src='${data.image}' alt="" >
        <button class="product-add-cart" onclick="addSP(${data.id})">
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
};
getListData();

// Bai 4
const listCart = JSON.parse(localStorage.getItem("listCart")) || [];

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
    localStorage.setItem("listCart", JSON.stringify(listCart));
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
const goToCartPage = () => {
    homePageHtml.classList.add("hidden");
    navbarHomeHtml.classList.remove("active");
    cartPageHtml.classList.remove("hidden");
    navbarCartHtml.classList.add("active");

    if (listCart.length > 0) {
        emptyCartHtml.classList.add("hidden");
        existingCartHtml.classList.remove("hidden");
        buyCartHtml.classList.remove("hidden");

        const itemCart = listCart.map((cart) => {
            const infoProduct = listData.find(
                (product) => cart.idSP === product.id
            );

            return `<li class="cart-item">
            <div class="cart-item-info">
                <img class="cart-item-img" src="${infoProduct.image}" alt="">
                <div>
                    <h1 class="cart-item-name">${infoProduct.name}</h1>
                    <p class="cart-item-quantity">Quantity: ${
                        infoProduct.quantity
                    }</p>
                </div>
            </div>
            <div class="cart-item-states">
                <div class="cart-item-state">
                    <i onclick="minusItem(${
                        infoProduct.id
                    })" class="plus-minus-icon fa-solid fa-minus"></i>
                    ${cart.soLuong}
                    <i onclick="plusItem(${
                        infoProduct.id
                    })" class="plus-minus-icon fa-solid fa-plus"></i>
                </div>
                <div class="cart-item-state">$${infoProduct.price}</div>
                <div class="cart-item-state">$${priceCart.get(cart.idSP)}</div>
                <div class="cart-item-state">
                    <i onclick="removeItem(${
                        infoProduct.id
                    })" class="clear-item-icon fa-regular fa-circle-xmark"></i>
                </div>
            </div>
        </li>`;
        });
        listCartHtml.innerHTML = itemCart.join(" ");
        totalPriceHtml.innerHTML = "total: $" + priceCart.get("total");
    } else {
        existingCartHtml.classList.add("hidden");
        buyCartHtml.classList.add("hidden");
        emptyCartHtml.classList.remove("hidden");
    }
};

const goToHomePage = () => {
    homePageHtml.classList.remove("hidden");
    cartPageHtml.classList.add("hidden");
    navbarHomeHtml.classList.add("active");
    navbarCartHtml.classList.remove("active");
    getListData();
};

const plusItem = (id) => {
    const item = listCart.find((cart) => cart.idSP === id);
    const infoItem = listData.find(data => data.id === item.idSP)
    if (item.soLuong < infoItem.quantity) {
        item.soLuong++;
        localStorage.setItem("listCart", JSON.stringify(listCart));
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
        localStorage.setItem("listCart", JSON.stringify(listCart));
        handlePriceCart();
        goToCartPage();
    }
};

const removeItem = (id) => {
    const indexItem = listCart.findIndex((cart) => cart.idSP === id);
    listCart.splice(indexItem, 1);
    localStorage.setItem("listCart", JSON.stringify(listCart));
    handlePriceCart();
    goToCartPage();
};

// Bai 7
const openModal = () => {
    modalHtml.classList.remove("hidden");
};

const closeModal = () => {
    modalHtml.classList.add("hidden");
};

// Bai 8
const getListProvince = (() => {
    const listProvince = document.querySelector("#province");

    fetch("https://provinces.open-api.vn/api/p/")
        .then((res) => res.json())
        .then((data) => {
            const provinceHtml = data.map(
                (data) => `
            <option key="${data.code}" value="${data.code}">${data.name}</option>
            `
            );
            listProvince.innerHTML =
                '<option value="">--Chọn Tỉnh/Thành phố--</option>' +
                provinceHtml.join(" ");
        })
        .catch((err) => console.log(err));
})();

const getListDistrict = () => {
    return fetch("https://provinces.open-api.vn/api/d/")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
};

const getListWard = () => {
    return fetch("https://provinces.open-api.vn/api/w/")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
};

// Bai 9
const getDistrictByProvinceID = async () => {
    const idProvince = document.getElementById("province").value;
    const listDistrict = await getListDistrict();
    const result = listDistrict.filter(
        (district) => district.province_code === Number(idProvince)
    );
    const districtHtml = result.map(
        (district) => `
    <option value="${district.code}">${district.name}</option>
    `
    );
    listDistrictHtml.innerHTML =
        '<option value="">--Chọn Huyện/Quận--</option>' +
        districtHtml.join(" ");
};

const getWardsByDistrictID = async () => {
    const idDistrict = document.getElementById("district").value;
    const listWard = await getListWard();
    const result = listWard.filter(
        (ward) => ward.district_code === Number(idDistrict)
    );
    const wardHtml = result.map(
        (ward) => `
    <option value="${ward.code}">${ward.name}</option>
    `
    );
    listWardHtml.innerHTML =
        '<option value="">--Chọn Phường/Xã--</option>' + wardHtml.join(" ");
};

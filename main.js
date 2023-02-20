// Bai 1 ok
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

// bai 3 ok
const listProductHtml = document.querySelector(".product-list");

// bai 5 ok
const countCartHtml = document.querySelector(".navbar-item-notice");

// bai 6 ok
const navbarCartHtml = document.querySelector("#cart");
const navbarHomeHtml = document.querySelector("#home");
const homePageHtml = document.querySelector(".home-page");
const cartPageHtml = document.querySelector(".cart-page");
const existingCartHtml = document.querySelector(".existing-cart");
const emptyCartHtml = document.querySelector(".empty-cart");
const buyCartHtml = document.querySelector(".total-price-cart");
const listCartHtml = document.querySelector(".cart-list");
const totalPriceHtml = document.querySelector(".total-price-cart-text");

// bai 7 ok
const modalHtml = document.querySelector(".modal");

// bai 9 ok
const listDistrictHtml = document.querySelector("#district");
const listWardHtml = document.querySelector("#ward");

// bai 12 ok
const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};

// Bai 2 ok
setLocalStorage(keyLocalStorageListSP, listData);

// Bai 3 ok
const getListData = () => {
    const listData = getLocalStorage(keyLocalStorageListSP);
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

// Bai 4 ok
const listCart = getLocalStorage(keyLocalStorageItemCart);

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

// Bai 5 ok
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

// Bai 6 ok
const DetailCart = () => {
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

// Bai 7 ok
const openModal = () => {
    modalHtml.classList.remove("hidden");
};

const closeModal = () => {
    modalHtml.classList.add("hidden");
};


// Bai 8 ok
let provinces = [];
const getListProvince = (() => {
    const listProvince = document.querySelector("#province");

    fetch("https://provinces.open-api.vn/api/p/")
        .then((res) => res.json())
        .then((data) => {
            provinces = data;
            const provinceHtml = data.map(
                (data) => `
            <option label="${data.name}" value="${data.code}"></option>
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

// Bai 9 ok
let districts = [];
let wards = [];

const getDistrictByProvinceID = async () => {
    const idProvince = document.getElementById("province").value;
    const listDistrict = await getListDistrict();
    districts = listDistrict.filter(
        (district) => district.province_code === Number(idProvince)
    );
    const districtHtml = districts.map(
        (district) => `
    <option label="${district.name}" value="${district.code}"></option>
    `
    );
    listDistrictHtml.innerHTML =
        '<option value="">--Chọn Huyện/Quận--</option>' +
        districtHtml.join(" ");
};

const getWardsByDistrictID = async () => {
    const idDistrict = document.getElementById("district").value;
    const listWard = await getListWard();
    wards = listWard.filter(
        (ward) => ward.district_code === Number(idDistrict)
    );
    const wardHtml = wards.map(
        (ward) => `
    <option label="${ward.name}" value="${ward.code}"></option>
    `
    );
    listWardHtml.innerHTML =
        '<option value="">--Chọn Phường/Xã--</option>' + wardHtml.join(" ");
};

// bai 10 ok
const createID = () => {
    const date = new Date();
    const ID = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getTime()}`;
    return ID;
};

// bai 11 ok
const firstNameInputHtml = document.getElementById("firstname");
const lastNameInputHtml = document.getElementById("lastname");
const emailInputHtml = document.getElementById("email");
const phoneNumberInputHtml = document.getElementById("phonenumber");
const addressProvinceHtml = document.getElementById("province");
const addressDistrictHtml = document.getElementById("district");
const addressWardHtml = document.getElementById("ward");
const addressInputHtml = document.getElementById("numberaddress");
const noteInputHtml = document.getElementById("notemessage");

const regex = {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    number: /^[0-9]+$/,
};

const getParentElement = (childElement, querySelector) => {
    const targetElement =
        childElement.parentElement.querySelector(querySelector);
    if (targetElement !== null) {
        return targetElement;
    }
    return getParentElement(childElement.parentElement, querySelector);
};

const isRequired = (el) => {
    const errorMessageHtml = getParentElement(el, ".auth-form-error");
    if (el.value !== "") {
        errorMessageHtml.innerHTML = null;
        return true;
    } else {
        errorMessageHtml.innerHTML = `Vui lòng nhập ${el.name}!`;
        return false;
    }
};

const isNumber = (el) => {
    const errorMessageHtml = getParentElement(el, ".auth-form-error");
    if (regex.number.test(el.value)) {
        errorMessageHtml.innerHTML = null;
        return true;
    } else {
        errorMessageHtml.innerHTML = `Nhập sai ${el.name}!`;
        return false;
    }
};

const isEmail = (el) => {
    const errorMessageHtml = getParentElement(el, ".auth-form-error");
    if (regex.email.test(el.value)) {
        errorMessageHtml.innerHTML = null;
        return true;
    } else {
        errorMessageHtml.innerHTML = `Nhập sai ${el.name}!`;
        return false;
    }
};

const validatePhoneNumber = () => {
    if (phoneNumberInputHtml.value === "") {
        return isRequired(phoneNumberInputHtml);
    } else {
        return isNumber(phoneNumberInputHtml);
    }
};

const validateEmail = () => {
    if (emailInputHtml.value === "") {
        return isRequired(emailInputHtml);
    } else {
        return isEmail(emailInputHtml);
    }
};

const validateAddress = () => {
    const errorMessageHtml = getParentElement(
        addressInputHtml,
        ".auth-form-error"
    );

    if (
        addressProvinceHtml.value !== "" &&
        addressDistrictHtml.value !== "" &&
        addressWardHtml.value !== "" &&
        addressInputHtml.value !== ""
    ) {
        errorMessageHtml.innerHTML = null;
        return true;
    } else {
        errorMessageHtml.innerHTML = "Vui lòng điền đầy đủ thông tin địa chỉ!";
        return false;
    }
};

const handleChangeProvince = () => {
    getDistrictByProvinceID();
    validateAddress();
};

const handleChangeDistrict = () => {
    getWardsByDistrictID();
    validateAddress();
};

const handleInfoUser = () => {
    isRequired(firstNameInputHtml);
    isRequired(lastNameInputHtml);
    validateEmail();
    validatePhoneNumber();
    validateAddress();

    if (
        isRequired(firstNameInputHtml) &&
        isRequired(lastNameInputHtml) &&
        validateEmail() &&
        validatePhoneNumber() &&
        validateAddress()
    ) {
        const province = provinces.find(
            (province) => province.code === +addressProvinceHtml.value
        );
        const district = districts.find(
            (district) => district.code === +addressDistrictHtml.value
        );
        const ward = wards.find((ward) => ward.code === +addressWardHtml.value);
        date = new Date();

        const bill = {
            id: createID(),
            fullName: `${firstNameInputHtml.value} ${lastNameInputHtml.value}`,
            email: emailInputHtml.value,
            phoneNumber: phoneNumberInputHtml.value,
            address: `${addressInputHtml.value}, ${ward.name}, ${district.name}, ${province.name}`,
            date: new Intl.DateTimeFormat("en-GB").format(date),
            note: noteInputHtml.value,
        };
        return bill;
    }
};

// bai 14 ok
const getListBill = () => {
    fetch("http://localhost:3000/bills")
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

const getBillByID = (id) => {
    fetch(`http://localhost:3000/bills/${id}`)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

const postBill = (data) => {
    fetch("http://localhost:3000/bills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

const updateBill = () => {
    fetch(`http://localhost:3000/bills/${id}`, {
        method: "PUT",
        body: JSON.stringify({ data }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

const deleteBill = (id) => {
    fetch(`http://localhost:3000/bills/${id}`, {
        method: "DELETE",
    }).then((response) => response.json());
};

// bai 15
const handleBuy = () => {
    const user = handleInfoUser();
    console.log(user);
};

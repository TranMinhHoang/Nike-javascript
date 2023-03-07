const listData = [
    {
        id: 0,
        name: "Nike GB",
        image: "./assets/images/home/NikeGB.webp",
        price: 200,
        quantity: 9,
    },
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
    {
        id: 7,
        name: "Nike Air Max 90",
        image: "./assets/images/home/NikeAirMax90.jfif",
        price: 579,
        quantity: 5,
    },
    {
        id: 8,
        name: "Nike Air Max 270",
        image: "./assets/images/home/NikeAirMax270.png",
        price: 399,
        quantity: 8,
    },
    {
        id: 9,
        name: "Nike Air Max Dawn",
        image: "./assets/images/home/NikeAirMaxDawn.webp",
        price: 799,
        quantity: 50,
    },
    {
        id: 10,
        name: "Nike Lebron 9",
        image: "./assets/images/home/NikeLebron9.jfif",
        price: 699,
        quantity: 46,
    },
];

const keyLocalStorageListSP = "DANHSACHSP";
const keyLocalStorageItemCart = "DANHSACHIMTEMCART";

const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};

const getParentElement = (element, selector) => {
    if (element.parentElement.matches(selector)) {
        return element.parentElement;
    }
    return getParentElement(element.parentElement, selector);
};

export {listData, keyLocalStorageListSP, keyLocalStorageItemCart, setLocalStorage, getLocalStorage, getParentElement}
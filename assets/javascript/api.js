import { setLocalStorage, keyLocalStorageItemCart, listData, getLocalStorage, keyLocalStorageListSP } from "./common.js";
import { handlePriceCart, goToCartPage, listCart } from "./cart.js"
import { closeModalDeleteBill, openModalSuccess } from "./modal.js";
import { goToBillPage } from "./bill.js";

const confirmBtnHtml = document.querySelector(".auth-form-confirm");


// address API
const getListProvince = () => {
    const listProvince = document.querySelector("#province");

    return fetch("https://provinces.open-api.vn/api/p/")
        .then((res) => res.json())
        .then((data) => {
            const provinceHtml = data.map(
                (data) => `
            <option label="${data.name}" value="${data.code}"></option>
            `
            );
            listProvince.innerHTML =
                '<option value="">--Chọn Tỉnh/Thành phố--</option>' +
                provinceHtml.join(" ");
            return data
        })
        .catch((err) => console.log(err));
};

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

// bill API
const getListBill = () => {
    return fetch("https://63f81a221dc21d5465b9898b.mockapi.io/api/bill")
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
};

const getBillByID = (id) => {
    return fetch(`https://63f81a221dc21d5465b9898b.mockapi.io/api/bill/${id}`)
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err));
};

const postBill = (data) => {
    fetch("https://63f81a221dc21d5465b9898b.mockapi.io/api/bill", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
                return response.json()
        })
        .then(() => {
            confirmBtnHtml.removeAttribute('disabled');
            openModalSuccess()
            listCart.splice(0, listCart.length)
            setLocalStorage(keyLocalStorageItemCart, listCart);
            handlePriceCart();
            goToCartPage();
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

const updateBill = (data) => {
    fetch(`https://63f81a221dc21d5465b9898b.mockapi.io/api/bill/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({ data }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

const deleteBill = async (id) => {
    const _listData = getLocalStorage(keyLocalStorageListSP)
    const detailBill = await getBillByID(id)
    detailBill.cart.detailCart.forEach(cart => {
        const infoItem = _listData.find((data) => data.id === cart.id)
        infoItem.quantity += cart.buyCount
        setLocalStorage(keyLocalStorageListSP, _listData)
    })
    fetch(`https://63f81a221dc21d5465b9898b.mockapi.io/api/bill/${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then(() => {
            closeModalDeleteBill()
            goToBillPage()
        })
};

export {getListDistrict, getListWard, getListProvince, getListBill, getBillByID, postBill, deleteBill, updateBill}
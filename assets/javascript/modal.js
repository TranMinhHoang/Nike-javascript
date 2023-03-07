import {
    getParentElement,
    setLocalStorage,
    keyLocalStorageItemCart,
    listData,
    keyLocalStorageListSP,
    getLocalStorage,
} from "./common.js";
import {
    getListDistrict,
    getListProvince,
    getListWard,
    getListBill,
    postBill,
    deleteBill,
} from "./api.js";
import {
    validateAddress,
    validateEmail,
    validateName,
    validatePhoneNumber,
    validator,
} from "./validator.js";
import {
    priceCart,
    detailCart,
    handlePriceCart,
    goToCartPage,
    listCart,
} from "./cart.js";
import { goToBillPage } from "./bill.js";

let provinces = [];
let districts = [];
let wards = [];

const modalAuthHtml = document.querySelector(".modal-auth");
const modalWarningHtml = document.querySelector(".modal-warning");
const modalSuccessHtml = document.querySelector(".modal-success");
const modalDeleteBillHtml = document.querySelector(".modal-delete-bill");
const modalDeleteProductHtml = document.querySelector(".modal-delete-product");
const buyBtnHtml = document.querySelector(".buy-btn");
const closeAllModalHtml = document.querySelectorAll(".scr-close-modal");
const firstNameInputHtml = document.getElementById("firstname");
const lastNameInputHtml = document.getElementById("lastname");
const emailInputHtml = document.getElementById("email");
const phoneNumberInputHtml = document.getElementById("phonenumber");
const addressProvinceHtml = document.getElementById("province");
const addressDistrictHtml = document.getElementById("district");
const addressWardHtml = document.getElementById("ward");
const addressInputHtml = document.getElementById("numberaddress");
const noteInputHtml = document.getElementById("notemessage");
const confirmBtnHtml = document.querySelector(".auth-form-confirm");
const goToBillBtnHtml = document.querySelector(".scr-bill");
const returnBillBtnHtml = document.querySelector(".return-bill-btn");
const deleteProductBtnHtml = document.querySelector(".delete-product-btn");
const listDistrictHtml = document.querySelector("#district");
const listWardHtml = document.querySelector("#ward");

const openModalAuth = async () => {
    modalAuthHtml.classList.remove("hidden");
    validator();
    provinces = await getListProvince();
    getDistrictByProvinceID();
};

const closeModalAuth = () => {
    modalAuthHtml.classList.add("hidden");
};

const openModalWarning = () => {
    modalWarningHtml.classList.remove("hidden");
};

const closeModalWarning = () => {
    modalWarningHtml.classList.add("hidden");
};

const openModalSuccess = () => {
    modalSuccessHtml.classList.remove("hidden");
};

const closeModalSuccess = () => {
    modalSuccessHtml.classList.add("hidden");
};

const openModalDeleteBill = (id) => {
    modalDeleteBillHtml.classList.remove("hidden");
    returnBillBtnHtml.onclick = () => {
        deleteBill(id);
    };
};

const closeModalDeleteBill = () => {
    modalDeleteBillHtml.classList.add("hidden");
};

const closeModalDeleteProduct = () => {
    modalDeleteProductHtml.classList.add("hidden");
};

const openModalDeleteProduct = (id) => {
    modalDeleteProductHtml.classList.remove("hidden");
    const _listData = getLocalStorage(keyLocalStorageListSP)
    const infoCart = listCart.find((cart) => cart.idSP === id);
    const indexItem = listCart.findIndex((cart) => cart.idSP === id);
    const infoItem = _listData.find((data) => data.id === id)

    deleteProductBtnHtml.onclick = () => {
        infoItem.quantity += infoCart.soLuong
        listCart.splice(indexItem, 1);
        setLocalStorage(keyLocalStorageItemCart, listCart);
        setLocalStorage(keyLocalStorageListSP, _listData)
        handlePriceCart();
        goToCartPage();
        closeModalDeleteProduct();
    };
};

buyBtnHtml.onclick = () => {
    openModalAuth();
};

goToBillBtnHtml.onclick = () => {
    closeAllModal();
    goToBillPage();
};

closeAllModalHtml.forEach((element) => {
    element.onclick = () => {
        closeAllModal();
    };
});

const closeAllModal = () => {
    closeModalAuth();
    closeModalWarning();
    closeModalSuccess();
    closeModalDeleteBill();
    closeModalDeleteProduct();
};

confirmBtnHtml.onclick = () => {
    createBill();
};

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

const handleChangeProvince = async () => {
    await getDistrictByProvinceID();
    getWardsByDistrictID();
    validateAddress();
};

const handleChangeDistrict = () => {
    getWardsByDistrictID();
    validateAddress();
};

const createID = async () => {
    const date = new Date();
    const ID = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getTime()}`;
    const listBill = await getListBill();
    if (listBill.some((bill) => bill.id === ID)) {
        return createID();
    }
    return ID;
};

const infoBill = async () => {
    const isFirstName = validateName(firstNameInputHtml);
    const isLastName = validateName(lastNameInputHtml);
    const isEmail = validateEmail(emailInputHtml);
    const isPhoneNumber = validatePhoneNumber(phoneNumberInputHtml);
    const isAddress = validateAddress();

    if (isFirstName && isLastName && isEmail && isPhoneNumber && isAddress) {
        const province = provinces.find(
            (province) => province.code === +addressProvinceHtml.value
        );
        const district = districts.find(
            (district) => district.code === +addressDistrictHtml.value
        );
        const ward = wards.find((ward) => ward.code === +addressWardHtml.value);
        const date = new Date();
        const id = await createID();
        const bill = {
            id,
            fullName: `${firstNameInputHtml.value.trim()} ${lastNameInputHtml.value.trim()}`,
            email: emailInputHtml.value.trim(),
            phoneNumber: phoneNumberInputHtml.value.trim(),
            address: `${addressInputHtml.value.trim()}, ${ward.name}, ${district.name}, ${province.name}`,
            date: new Intl.DateTimeFormat("en-GB").format(date),
            note: noteInputHtml.value.trim(),
            cart: {
                detailCart: detailCart(),
                total: priceCart.get("total"),
            },
        };
        return bill;
    }
};

const createBill = async () => {
    const bill = await infoBill();
    if (bill) {
        postBill(bill);
        confirmBtnHtml.setAttribute("disabled", "");
    }
};

export {
    openModalSuccess,
    openModalDeleteBill,
    closeModalDeleteBill,
    openModalWarning,
    openModalDeleteProduct,
    handleChangeDistrict,
    handleChangeProvince,
};

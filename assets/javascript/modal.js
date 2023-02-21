import { getParentElement } from "./common.js";
import { priceCart, detailCart } from "./cart.js";

// Bai 7
const modalAuthHtml = document.querySelector(".modal-auth");
const modalWarningHtml = document.querySelector(".modal-warning");
const buyBtnHtml = document.querySelector(".buy-btn");
const closeModalAuthHtml = document.querySelectorAll(".close-modal");

// bai 9
const listDistrictHtml = document.querySelector("#district");
const listWardHtml = document.querySelector("#ward");

// bai 11
const nameInputHtml = document.querySelectorAll(".name-input");

const firstNameInputHtml = document.getElementById("firstname");
const lastNameInputHtml = document.getElementById("lastname");
const emailInputHtml = document.getElementById("email");
const phoneNumberInputHtml = document.getElementById("phonenumber");
const addressProvinceHtml = document.getElementById("province");
const addressDistrictHtml = document.getElementById("district");
const addressWardHtml = document.getElementById("ward");
const addressInputHtml = document.getElementById("numberaddress");
const noteInputHtml = document.getElementById("notemessage");

const confirmBtnHtml = document.querySelector(".auth-form-confirm")

const openModalAuth = () => {
    modalAuthHtml.classList.remove("hidden");
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

buyBtnHtml.onclick = () => {
    openModalAuth();
};

closeModalAuthHtml.forEach((element) => {
    element.onclick = () => {
        closeModalAuth();
        closeModalWarning()
    };
});



// bai 8
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

// Bai 9
let districts = [];

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

let wards = [];

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

// bai 10
const createID = () => {
    const date = new Date();
    const ID = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getTime()}`;
    return ID;
};

// bai 11
const regex = {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    number: /^[0-9]+$/,
};


const validator = (() => {
    nameInputHtml.forEach((element) => {
        element.onblur = () => {
            validateName(element);
        };
        element.onkeypress = () => {
            validateName(element);
        };
    });
    emailInputHtml.onblur = () => {
        validateEmail(emailInputHtml)
    }
    emailInputHtml.onkeyup = () => {
        validateEmail(emailInputHtml)
    }
    
    phoneNumberInputHtml.onblur = () => {
        validatePhoneNumber(phoneNumberInputHtml)
    }
    phoneNumberInputHtml.onkeyup = () => {
        validatePhoneNumber(phoneNumberInputHtml)
    }
    
    addressProvinceHtml.onchange = () => {
        handleChangeProvince()
    }
    addressDistrictHtml.onchange = () => {
        handleChangeDistrict()
    }
    addressWardHtml.onchange = () => {
        validateAddress()
    }
    addressInputHtml.onblur = () => {
        validateAddress()
    }
    addressInputHtml.onkeyup = () => {
        validateAddress()
    }

    confirmBtnHtml.onclick = () => {
        confirmBill()
    }
})()

const validateName = (el) => {
    const errorMessageHtml = getParentElement(
        el,
        ".auth-form-input-col-2"
    ).querySelector(".auth-form-error");
    if (el.value !== "") {
        errorMessageHtml.innerHTML = null;
        return true;
    } else {
        errorMessageHtml.innerHTML = `Vui lòng nhập ${el.name}!`;
        return false;
    }
};

const validateEmail = (element) => {
    const errorMessageHtml = getParentElement(
        element,
        ".auth-form-group"
    ).querySelector(".auth-form-error");
    if (element.value === "") {
        errorMessageHtml.innerHTML = `Vui lòng nhập ${element.name}!`;
        return false;
    }
    if (regex.email.test(element.value)) {
        errorMessageHtml.innerHTML = null;
        return true;
    } else {
        errorMessageHtml.innerHTML = `Nhập sai ${element.name}!`;
        return false;
    }
};

const validatePhoneNumber = (element) => {
    const errorMessageHtml = getParentElement(
        element,
        ".auth-form-group"
    ).querySelector(".auth-form-error");
    if (element.value === "") {
        errorMessageHtml.innerHTML = `Vui lòng nhập ${element.name}!`;
        return false;
    } 
    if (regex.number.test(element.value)) {
        errorMessageHtml.innerHTML = null;
        return true;
    } else {
        errorMessageHtml.innerHTML = `Nhập sai ${element.name}!`;
        return false;
    }
};

const validateAddress = () => {
    const errorMessageHtml = getParentElement(
        addressInputHtml,
        ".auth-form-group"
        ).querySelector(".auth-form-error");

    if (
        addressProvinceHtml.value !== "" &&
        addressDistrictHtml.value !== "" &&
        addressWardHtml.value !== "" &&
        addressInputHtml.value !== ""
    ) {
        errorMessageHtml.innerHTML = null;
        return true;
    } else {
        errorMessageHtml.innerHTML = "Vui lòng nhập đầy đủ thông tin địa chỉ!";
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

const confirmBill = () => {
    validateName(firstNameInputHtml)
    validateName(lastNameInputHtml)
    validateEmail(emailInputHtml);
    validatePhoneNumber(phoneNumberInputHtml);
    validateAddress();
    
    if (
        validateName(firstNameInputHtml) &&
        validateName(lastNameInputHtml) &&
        validateEmail(emailInputHtml) &&
        validatePhoneNumber(phoneNumberInputHtml) &&
        validateAddress()
    ) {
        const province = provinces.find(
            (province) => province.code === +addressProvinceHtml.value
        );
        const district = districts.find(
            (district) => district.code === +addressDistrictHtml.value
        );
        const ward = wards.find((ward) => ward.code === +addressWardHtml.value);
        const date = new Date();
        
        const bill = {
            id: createID(),
            fullName: `${firstNameInputHtml.value} ${lastNameInputHtml.value}`,
            email: emailInputHtml.value,
            phoneNumber: phoneNumberInputHtml.value,
            address: `${addressInputHtml.value}, ${ward.name}, ${district.name}, ${province.name}`,
            date: new Intl.DateTimeFormat("en-GB").format(date),
            note: noteInputHtml.value,
            cart: {
                detailCart: detailCart(),
                total: priceCart.get('total')
            }
        };
        console.log(bill)
        return bill;
    }
};


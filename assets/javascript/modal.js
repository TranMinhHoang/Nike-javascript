// Bai 7
const modalHtml = document.querySelector(".modal");

// bai 9
const listDistrictHtml = document.querySelector("#district");
const listWardHtml = document.querySelector("#ward");

const openModal = () => {
    modalHtml.classList.remove("hidden");
};

const closeModal = () => {
    modalHtml.classList.add("hidden");
};

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

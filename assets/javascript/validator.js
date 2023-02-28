import { getParentElement } from "./common.js";
import { handleChangeDistrict, handleChangeProvince } from "./modal.js";

const nameInputHtml = document.querySelectorAll(".name-input");
const emailInputHtml = document.getElementById("email");
const phoneNumberInputHtml = document.getElementById("phonenumber");
const addressProvinceHtml = document.getElementById("province");
const addressDistrictHtml = document.getElementById("district");
const addressWardHtml = document.getElementById("ward");
const addressInputHtml = document.getElementById("numberaddress");

const regex = {
    email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    phoneNumber: /^[0-9\-\+]{10,15}$/,
    letter: /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
};

const validator = () => {
    nameInputHtml.forEach((element) => {
        element.onblur = () => {
            validateName(element);
        };
        element.onkeyup = () => {
            validateName(element);
        };
    });
    emailInputHtml.onblur = () => {
        validateEmail(emailInputHtml);
    };
    emailInputHtml.onkeyup = () => {
        validateEmail(emailInputHtml);
    };

    phoneNumberInputHtml.onblur = () => {
        validatePhoneNumber(phoneNumberInputHtml);
    };
    phoneNumberInputHtml.onkeyup = () => {
        validatePhoneNumber(phoneNumberInputHtml);
    };

    addressProvinceHtml.onchange = () => {
        handleChangeProvince();
    };
    addressDistrictHtml.onchange = () => {
        handleChangeDistrict();
    };
    addressWardHtml.onchange = () => {
        validateAddress();
    };
    addressInputHtml.onblur = () => {
        validateAddress();
    };
    addressInputHtml.onkeyup = () => {
        validateAddress();
    };
};

const validateName = (el) => {
    const errorMessageHtml = getParentElement(
        el,
        ".auth-form-input-col-2"
    ).querySelector(".auth-form-error");
    if (el.value === "") {
        errorMessageHtml.innerHTML = `Vui lòng nhập ${el.name}!`;
        return false;
    }
    if (regex.letter.test(el.value)) {
        errorMessageHtml.innerHTML = null;
        return true;
    } else {
        errorMessageHtml.innerHTML = `${el.name} chỉ gồm chữ cái!`;
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
    if (regex.phoneNumber.test(element.value)) {
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

export {
    validator,
    validateAddress,
    validateEmail,
    validateName,
    validatePhoneNumber,
};

import { getParentElement } from "./common.js"

const navbarBillHtml = document.getElementById('bill')
const navbarHomeHtml = document.getElementById('home')
const navbarCartHtml = document.getElementById('cart')
const billPageHtml = document.querySelector('.bill-page')
const homePageHtml = document.querySelector('.home-page')
const cartPageHtml = document.querySelector('.cart-page')
const footerHtml = document.querySelector('.footer')
const listBillHtml = document.querySelector('.bill-body-list')

const getListBill = () => {
    return fetch("http://localhost:3000/bills")
        .then((res) => res.json())
        .then((data) => data)
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
        .then((response) => {
                return response.json()
        })
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

const updateBill = (data) => {
    fetch(`http://localhost:3000/bills/${data.id}`, {
        method: "PUT",
        body: JSON.stringify({ data }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
};

const deleteBill = (id) => {
    fetch(new Request(`http://localhost:3000/bills/${id}`, {redirect: 'error'}), {
        method: "DELETE",
    }).then((response) => response.json());
};

const goToBillPage = async () => {
    navbarBillHtml.classList.add('active')
    navbarHomeHtml.classList.remove('active')
    navbarCartHtml.classList.remove('active')
    homePageHtml.classList.add('hidden')
    cartPageHtml.classList.add('hidden')
    billPageHtml.classList.remove('hidden')
    footerHtml.classList.add('hidden')
    
    const listBill = await getListBill()
    const bill = listBill.map(bill => (
        `<li class="bill-body-item">
        <div class="bill-info-list">
            <div class="bill-info-item">
                ${bill.id}
                <button class="bill-detail-btn">
                    Detail
                    <i class="fa-solid fa-caret-down"></i>
                </button>
            </div>
            <div class="bill-info-item">${bill.fullName}</div>
            <div class="bill-info-item">${bill.date}</div>
            <div class="bill-info-item">${bill.cart.detailCart.length}</div>
            <div class="bill-info-item">${bill.cart.detailCart.reduce((prev, curr) => prev + curr.buyCount, 0) }</div>
            <div class="bill-info-item">$ ${bill.cart.total}</div>
            <div class="bill-info-item">
                <i class="fa-regular fa-rectangle-xmark bill-remove-icon"></i>
            </div>
        </div>
        <div class="detail-bill hidden">
            <ul class="detail-bill-list">
                ${bill.cart.detailCart.map(item => (
                    `<li class="detail-bill-item">
                    <img src="${item.image}" alt="" class="detail-bill-img">
                    <div class="detail-bill-info">
                        <h2 class="detail-bill-name">${item.name}</h2>
                        <div class="detail-bill-price-wrap">
                            <span class="detail-bill-price">$${item.subPrice}</span>
                            <span class="detail-bill-multify">x</span>
                            <span class="detail-bill-count">${item.buyCount}</span>
                        </div >
                    </div >
                </li>`
                )).join(' ')}
            </ul >
        </div>
    </li >`
    ))
    listBillHtml.innerHTML = bill.join(' ')
    const detailBillBtnHtml = document.querySelectorAll('.bill-detail-btn')
    const deleteBillBtnHtml = document.querySelectorAll('.bill-remove-icon')
    detailBillBtnHtml.forEach(element => {
        element.onclick = () => {
            const detailBillHtml = getParentElement(element, '.bill-body-item').querySelector('.detail-bill')
            detailBillHtml.classList.toggle('hidden')
            
        }
    })  
    deleteBillBtnHtml.forEach(element => {
        element.onclick = async (e) => {
            const idBill = getParentElement(element, 'li').querySelector('.bill-info-item').innerText.split(' ')[0]
            await deleteBill(idBill)
            goToBillPage()
        }
    })
}

navbarBillHtml.onclick = () => {
    goToBillPage()
}



export {postBill}
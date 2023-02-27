import { getListBill } from "./api.js"
import { getParentElement } from "./common.js"
import { openModalDeleteBill } from "./modal.js"

const navbarBillHtml = document.getElementById('bill')
const navbarHomeHtml = document.getElementById('home')
const navbarCartHtml = document.getElementById('cart')
const billPageHtml = document.querySelector('.bill-page')
const homePageHtml = document.querySelector('.home-page')
const cartPageHtml = document.querySelector('.cart-page')
const footerHtml = document.querySelector('.footer')
const listBillHtml = document.querySelector('.bill-body-list')

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
        `<li class="bill-body-item" value="${bill.idSystem}">
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
        element.onclick = () => {
            // const idBill = getParentElement(element, 'li').querySelector('.bill-info-item').innerText.split(' ')[0]
            const idBill = getParentElement(element, 'li').value
            openModalDeleteBill(idBill)
        }
    })
}

navbarBillHtml.onclick = () => {
    goToBillPage()
}



export {goToBillPage}
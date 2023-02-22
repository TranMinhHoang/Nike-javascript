const navbarBillHtml = document.getElementById('bill')
const navbarHomeHtml = document.getElementById('home')
const navbarCartHtml = document.getElementById('cart')
const billPageHtml = document.querySelector('.bill-page')
const homePageHtml = document.querySelector('.home-page')
const cartPageHtml = document.querySelector('.cart-page')
const listBillHtml = document.querySelector('.bill-body-list')

// bai 14
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

// bai 16
const goToBillPage = async () => {
    navbarBillHtml.classList.add('active')
    navbarHomeHtml.classList.remove('active')
    navbarCartHtml.classList.remove('active')
    homePageHtml.classList.add('hidden')
    cartPageHtml.classList.add('hidden')
    billPageHtml.classList.remove('hidden')

    const listBill = await getListBill()
    const bill = listBill.map(bill => (
        `<li class="bill-body-item">
        <ul class="bill-info-list">
            <li class="bill-info-item">
                ${bill.id}
                <button class="bill-detail-code">
                    Detail
                    <i class="fa-solid fa-caret-down"></i>
                </button>
            </li>
            <li class="bill-info-item">${bill.fullName}</li>
            <li class="bill-info-item">${bill.date}</li>
            <li class="bill-info-item">${bill.cart.detailCart.map(item => item.id).join(', ')}</li>
            <li class="bill-info-item">${bill.cart.detailCart.reduce((prev, curr) => prev + curr.buyCount, 0) }</li>
            <li class="bill-info-item">$ ${bill.cart.total}</li>
            <li class="bill-info-item">
                <i class="fa-regular fa-rectangle-xmark bill-remove-icon"></i>
            </li>
        </ul>
    </li >`
    ))
    listBillHtml.innerHTML = bill.join(' ')
}

navbarBillHtml.onclick = () => {
    goToBillPage()
}



export {postBill}
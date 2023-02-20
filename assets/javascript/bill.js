// bai 14
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
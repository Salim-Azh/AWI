import Bill from "./Bill";
const apiUrl = require("../../public/urlApi")

export function getBillsFromDB() {
    return fetch(apiUrl.Bills)
        .then(r => r.json())
        .then((response) => {
            return response.bills
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}


function createBill(bill) {
    return (
        <Bill
            key={bill._id}
            _id={bill._id}
            name={bill.name}
            deleteBill={deleteBill}
        />
    )
}

export function filterBillByName(bills, filterText) {
    let rows = []
    if(bills) {
        bills.map(bill => {
            if (bill && (bill.name.toLowerCase().includes(filterText))) {
                rows.push(createBill(bill))
            }
        })
        return rows
    }
}

export function addBill(bill) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(bill)
    }
    return fetch(apiUrl.Bills, param)
}

let _handleDelete
export function setHandleDelete(handler) {
    _handleDelete = handler
}

export function deleteBill(event) {
    const billId = event.target.name

    fetch(apiUrl.Bills + "/" + billId, { method: 'DELETE' })
        .then(() => _handleDelete(billId))
}

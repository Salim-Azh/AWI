import Reservation from "./Reservation";
const apiUrl = require("../../public/urlApi")

export function getReservationsFromDB() {
    return fetch(apiUrl.Reservations)
        .then(r => r.json())
        .then((response) => {
            return response.reservations
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

export function getExhibitorsFromDB() {
    return fetch(apiUrl.Exhibitors)
        .then(r => r.json())
        .then(response => {
            return response.exhibitors
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}


function createReservation(response) {
    return (
        <Reservation
            key={response.reservation._id}
            exhibitor={response.exhibitor}
            reservation={response.reservation}
            deleteReservation={deleteReservation}
            handleChange={updateReservation}
        />
    )
}

export function filterReservationByName(reservations, filterText) {
    let rows = []
    if(reservations) {
        reservations.map(reservation => {
            if(reservation.exhibitor) {
                if (reservation && (reservation.exhibitor.name.toLowerCase().includes(filterText))) {
                    rows.push(createReservation(reservation))
                }
            }
        })
        return rows
    }
}

export function filterEditorByVolunteer(reservations) {
    let rows = []
    if(reservations) {
        reservations.map(reservation => {
            if(reservation.reservation) {
                if (reservation && (reservation.reservation.need_volunteer)) {
                    rows.push(createReservation(reservation))
                }
            }
        })
        return rows
    }
}

export function filterEditorByEditorPresent(reservations) {
    let rows = []
    if(reservations) {
        reservations.map(reservation => {
            if(reservation.reservation) {
                console.log(reservation.reservation.isEditorHere)
                if (reservation && (reservation.reservation.isEditorHere)) {
                    rows.push(createReservation(reservation))
                }
            }
        })
        console.log(rows)
        return rows
    }
}

export function filterEditorByReportSent(reservations) {
    let rows = []
    if(reservations) {
        reservations.map(reservation => {
            if(reservation.reservation) {
                if (reservation && (reservation.reservation.reportSent)) {
                    rows.push(createReservation(reservation))
                }
            }
        })
        return rows
    }
}

export function addReservation(reservation) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(reservation)
    }
    return fetch(apiUrl.Reservations, param)
}

let _handleDelete
export function setHandleDelete(handler) {
    _handleDelete = handler
}

export function deleteReservation(event) {
    const reservationId = event.target.name

    fetch(apiUrl.Reservations + "/" + reservationId, { method: 'DELETE' })
        .then(() => _handleDelete(reservationId))
}

let _handleUpdate
export function setUpdateHandler(handler) {
    _handleUpdate = handler
}

function updateReservation(event) {
    const reservationId = event.target.id
    const checked = event.target.checked
    const name = event.target.name

    const body = {[name]: checked}
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(body)
    }
    return fetch(apiUrl.Reservations + "/" + reservationId, param)
        .then(() => _handleUpdate(reservationId, name, checked))
}

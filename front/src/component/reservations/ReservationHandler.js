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


function createReservation(reservation) {
    return (
        <Reservation
            key={reservation._id}
            _id={reservation._id}
            name={reservation.name}
            deleteReservation={deleteReservation}
        />
    )
}

export function filterReservationByName(reservations, filterText) {
    let rows = []
    if(reservations) {
        reservations.map(reservation => {
            if (reservation && (reservation.name.toLowerCase().includes(filterText))) {
                rows.push(createReservation(reservation))
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

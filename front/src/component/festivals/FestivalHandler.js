import Festival from "./Festival";
const apiUrl = require("../../public/urlApi")

export function getFestivalsFromDB() {
    return fetch(apiUrl.Festivals)
        .then(r => r.json())
        .then((response) => {
            return response.reservations
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}


function createFestival(festival) {
    return (
        <Festival
            key={festival._id}
            _id={festival._id}
            name={festival.name}
            deleteFestival={deleteFestival}
        />
    )
}

export function filterFestivalByName(festivals, filterText) {
    let rows = []
    if(festivals) {
        festivals.map(festival => {
            if (festival && (festival.name.toLowerCase().includes(filterText))) {
                rows.push(createFestival(festival))
            }
        })
        return rows
    }
}

export function addFestival(festival) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(festival)
    }
    return fetch(apiUrl.Festivals, param)
}

let _handleDelete
export function setHandleDelete(handler) {
    _handleDelete = handler
}

export function deleteFestival(event) {
    const festivalId = event.target.name

    fetch(apiUrl.Festivals + "/" + festivalId, { method: 'DELETE' })
        .then(() => _handleDelete(festivalId))
}

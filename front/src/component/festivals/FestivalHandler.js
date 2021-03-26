import Festival from "./Festival";
import {Card, Col} from "react-bootstrap";
const apiUrl = require("../../public/urlApi")
const errorHandler = require("../error/errorHandler")

export function getFestivalsFromDB() {
    return fetch(apiUrl.Festivals)
        .then(r => r.json())
        .then((response) => {
            return response.festivals
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}


function createFestival(festival) {
    let color
    if(festival.is_current) {color = "success"}
    else {color = "secondary"}

    return (
        <Col style={{margin: '1em'}} key={festival._id}>
        <Card bg={color}>
            <Festival
                festival={festival}
                deleteFestival={deleteFestival}
                handleUpdate={updateFestival}
                handleUpdateCurrent={updateCurrent}
            />
        </Card>
        </Col>
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

export function filterFestivalByYear(festivals, filterText) {
    let rows = []
    if(festivals) {
        festivals.map(festival => {
            if (festival && (festival.year.toString().includes(filterText))) {
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

let _handleUpdate
export function setHandleUpdate(handler) {
    _handleUpdate = handler
}

export function updateFestival(festival) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "PUT",
        body: JSON.stringify(festival)
    }

    fetch(apiUrl.Festivals + "/" + festival._id, param)
        .then(r => errorHandler.handleResponse(r, "Modification du festival"))
}

export function updateCurrent(festival) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "PUT",
        body: JSON.stringify(festival)
    }
    fetch(apiUrl.Festivals + "/" + festival._id + "/current", param)
        .then(r => errorHandler.handleResponse(r, "Modification du festival"))
        .then(r => _handleUpdate(festival._id, festival.is_current))
}

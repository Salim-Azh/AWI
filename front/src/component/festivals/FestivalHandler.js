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
                _id={festival._id}
                name={festival.name}
                year={festival.year}
                nb_t_premium={festival.nb_t_premium}
                nb_t_standard={festival.nb_t_standard}
                nb_t_low={festival.nb_t_low}
                nb_sm_premium={festival.nb_sm_premium}
                nb_sm_standard={festival.nb_sm_standard}
                nb_sm_low={festival.nb_sm_low}
                premium_t_price={festival.premium_t_price}
                standard_t_price={festival.standard_t_price}
                low_t_price={festival.low_t_price}
                premium_sm_price={festival.premium_sm_price}
                standard_sm_price={festival.standard_sm_price}
                low_sm_price={festival.low_sm_price}
                is_current={festival.is_current}
                deleteFestival={deleteFestival}
                handleUpdate={updateFestival}
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

    fetch(apiUrl.Festivals + "/" + festival._id, param)
        .then(r => errorHandler.handleResponse(r, "Modification du festival"))
        .then(r => _handleUpdate(festival._id, festival.is_current))
}

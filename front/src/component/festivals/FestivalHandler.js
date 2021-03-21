import Festival from "./Festival";
import {Card, Col} from "react-bootstrap";
const apiUrl = require("../../public/urlApi")

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
    return (
        <Col style={{margin: '1em'}}>
        <Card bg={"secondary"}>
            <Festival
                key={festival._id}
                _id={festival._id}
                name={festival.name}
                year={festival.year}
                nb_tables_premium={festival.nb_tables_premium}
                nb_tables_standard={festival.nb_tables_standard}
                nb_tables_low={festival.nb_tables_low}
                premium_t_price={festival.premium_t_price}
                standard_t_price={festival.standard_t_price}
                low_t_price={festival.low_t_price}
                premium_sm_price={festival.premium_sm_price}
                standard_sm_price={festival.standard_sm_price}
                low_sm_price={festival.low_sm_price}
                deleteFestival={deleteFestival}
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

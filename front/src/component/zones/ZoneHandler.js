import Zone from "./Zone";
const apiUrl = require("../../public/urlApi")

export function getZonesFromDB() {
    return fetch(apiUrl.Zones)
        .then(r => r.json())
        .then((response) => {
            return response.zones
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}


function createZone(zone) {
    return (
        <Zone
            key={zone._id}
            _id={zone._id}
            name={zone.name}
            deleteZone={deleteZone}
        />
    )
}

export function filterZoneByName(zones, filterText) {
    let rows = []
    if(zones) {
        zones.map(zone => {
            if (zone && (zone.name.toLowerCase().includes(filterText))) {
                rows.push(createZone(zone))
            }
        })
        return rows
    }
}

export function addZone(zone) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(zone)
    }
    return fetch(apiUrl.Zones, param)
}

let _handleDelete
export function setHandleDelete(handler) {
    _handleDelete = handler
}

export function deleteZone(event) {
    const zoneId = event.target.name

    fetch(apiUrl.Zones + "/" + zoneId, { method: 'DELETE' })
        .then(() => _handleDelete(zoneId))
}

import Zone from "./Zone";
const apiUrl = require("../../public/urlApi")

export function getZonesFromDB() {
    return fetch(apiUrl.Festivals + "/zones")
        .then(r => r.json())
        .then((response) => {
            return response
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

export function getZoneFromDB(zoneId) {
    return fetch(apiUrl.Zones + "/" + zoneId)
        .then(r => r.json())
        .then((response) => {
            return response
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

export function createZone(zone) {
    return (
        <Zone
            key={zone._id}
            zone={zone}
            editor={zone.editor}
            deleteZone={deleteZone}
        />
    )
}

export function filterZonesByName(zones, filterText) {
    let rows = []
    if(zones) {
        zones.map(zone => {
            if (zone && (zone.label.toLowerCase().includes(filterText))) {
                rows.push(createZone(zone))
            }
        })
        return rows
    }
}

export function addZones(zone) {
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

    return fetch(apiUrl.Zones + "/" + zoneId, { method: 'DELETE' })
        .then(() => _handleDelete(zoneId))
}

export function updateZone(zone) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "PUT",
        body: JSON.stringify(zone)
    }

    return fetch(apiUrl.Zones + "/" + zone._id, param)
}

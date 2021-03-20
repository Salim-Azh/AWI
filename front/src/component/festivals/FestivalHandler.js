import Festival from "./Festival";
const apiUrl = require("../../public/urlApi")

export function getFestivalsFromDB() {
    return fetch(apiUrl.Editors)
        .then(r => r.json())
        .then((response) => {
            return response.editors
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
            deleteEditor={deleteFestival}
        />
    )
}

export function filterFestivalByName(festivals, filterText) {
    let rows = []
    if(festivals) {
        festivals.map(editor => {
            if (editor && (editor.name.toLowerCase().includes(filterText))) {
                rows.push(createFestival(editor))
            }
        })
        return rows
    }
}

// TODO ajouter dans le front l'envoie de l'editor id
export function addFestival(editor) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(editor)
    }
    return fetch(apiUrl.Editors, param)
}

let _handleDelete
export function setHandleDelete(handler) {
    _handleDelete = handler
}

export function deleteFestival(event) {
    const festivalId = event.target.name

    fetch(apiUrl.Editors + "/" + festivalId, { method: 'DELETE' })
        .then(() => _handleDelete(festivalId))
}

import Table from "./Table";
const apiUrl = require("../../public/urlApi")

export function getTablesFromDB() {
    return fetch(apiUrl.Tables)
        .then(r => r.json())
        .then((response) => {
            return response.tables
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}


function createTable(table) {
    return (
        <Table
            key={table._id}
            _id={table._id}
            name={table.name}
            deleteTable={deleteTable}
        />
    )
}

export function filterTableByName(tables, filterText) {
    let rows = []
    if(tables) {
        tables.map(table => {
            if (table && (table.name.toLowerCase().includes(filterText))) {
                rows.push(createTable(table))
            }
        })
        return rows
    }
}

export function addTable(table) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(table)
    }
    return fetch(apiUrl.Tables, param)
}

let _handleDelete
export function setHandleDelete(handler) {
    _handleDelete = handler
}

export function deleteTable(event) {
    const tableId = event.target.name

    fetch(apiUrl.Tables + "/" + tableId, { method: 'DELETE' })
        .then(() => _handleDelete(tableId))
}

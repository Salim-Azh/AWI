import Editor from "./Editor";
const apiUrl = require("../../public/urlApi")

export function getEditorsFromDB() {
    return fetch(apiUrl.Editors)
        .then(r => r.json())
        .then(response => {
            return response.editors
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

export function getEditorFromDB(id) {
    return fetch(apiUrl.Editors + "/" + id)
        .then(r => r.json())
        .then(response => {
            return response.editor
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

function createEditor(editor) {
    return (
        <Editor
            key={editor._id}
            _id={editor._id}
            name={editor.name}
            contacts={editor.contacts}
            isEditor={editor.isEditor}
            isExhibitor={editor.isExhibitor}
            isPotential={editor.isPotential}
            deleteEditor={deleteEditor}
            handleEditor={updateEditorState}
        />
    )
}

export function filterEditorByName(editors, filterText) {
    let rows = []
    if(editors) {
        editors.map(editor => {
            if (editor && (editor.name.toLowerCase().includes(filterText))) {
                rows.push(createEditor(editor))
            }
        })
        return rows
    }
}

export function filterEditorByEditorOnly(editors) {
    let rows = []
    if(editors) {
        editors.map(editor => {
            if (editor && (editor.isEditor)) {
                rows.push(editor)
            }
        })
        return filterEditorByPotentialOnly(rows)
    }
}

export function filterEditorByExhibitorOnly(editors) {
    let rows = []
    if(editors) {
        editors.map(editor => {
            if (editor && (editor.isExhibitor)) {
                rows.push(editor)
            }
        })
        return filterEditorByPotentialOnly(rows)
    }
}

function filterEditorByPotentialOnly(editors) {
    let rows = []
    if(editors) {
        editors.map(editor => {
            if (editor && (editor.isPotential)) {
                rows.push(createEditor(editor))
            }
        })
        return rows
    }
}

export function addEditor(editor) {
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

export function deleteEditor(event) {
    const editorId = event.target.name

    fetch(apiUrl.Editors + "/" + editorId, { method: 'DELETE' })
        .then(() => _handleDelete(editorId))
}

let _handleUpdate
export function setHandleUpdate(handler) {
    _handleUpdate = handler
}

export function updateEditorState(event) {
    const editorId = event.target.id
    const checked = event.target.checked
    const name = event.target.name

    const body = {[name]: checked}
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "PUT",
        body: JSON.stringify(body)
    }

    return fetch(apiUrl.Editors + "/" + editorId, param)
        .then(() => _handleUpdate(editorId, name, checked))
}

export function updateEditor(editor) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "PUT",
        body: JSON.stringify(editor)
    }

    return fetch(apiUrl.Editors + "/" + editor._id, param)
}

export function getGamesFromEditor(editorId) {
    return fetch(apiUrl.Editors + "/" + editorId + "/games/")
        .then(r => r.json())
        .then(response => {
            return response.games
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

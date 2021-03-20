import Editor from "./Editor";
const apiUrl = require("../../public/urlApi")

export function getEditorsFromDB() {
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


function createEditor(editor) {
    return (
        <Editor
            key={editor._id}
            _id={editor._id}
            name={editor.name}
            deleteEditor={deleteEditor}
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

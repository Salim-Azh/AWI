import EditorFollowUp from "./EditorFollowUp";
const apiUrl = require("../../../public/urlApi")

export function getEditorsFollowUpFromDB() {
    return fetch(apiUrl.EditorsFollowUp)
        .then(r => r.json())
        .then((response) => {
            return response.editorsFollowUp
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

function createEditorFollowUp(editor, reservation) {
    return (
        <EditorFollowUp
            key={editor._id}
            _id={editor._id}
            name={editor.name}
            comms={"rieng"}
            firstContact={"26/10/2010"}
            secondContact={"26/10/2010"}
            thirdContact={"26/10/2010"}
            state={""}
            needVolunteer={true}
            isEditorHere={false}
            reportSent={true}
            tableReserved={24}
            m2Reserved={2}
            bill={null}
            total={1000}
        />
    )
}

export function filterEditorByName(editors, filterText) {
    let rows = []
    if(editors) {
        editors.map(editor => {
            if (editor && (editor.name.toLowerCase().includes(filterText))) {
                rows.push(createEditorFollowUp(editor))
            }
        })
        return rows
    }
}

export function filterEditorByVolunteer(editors) {
    console.log(editors)
    let rows = []
    if(editors) {
        editors.map(editor => {
            if (editor && (editor.needVolunteer)) {
                rows.push(createEditorFollowUp(editor))
            }
        })
        return rows
    }
}

export function filterEditorByEditorPresent(editors) {
    let rows = []
    if(editors) {
        editors.map(editor => {
            if (editor && (editor.isEditorHere)) {
                rows.push(createEditorFollowUp(editor))
            }
        })
        return rows
    }
}

export function filterEditorByReportSent(editors) {
    let rows = []
    if(editors) {
        editors.map(editor => {
            if (editor && (editor.reportSent)) {
                rows.push(createEditorFollowUp(editor))
            }
        })
        return rows
    }
}

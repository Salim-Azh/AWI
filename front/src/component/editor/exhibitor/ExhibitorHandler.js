import Exhibitor from "./Exhibitor";

function createExhibitor(exhibitor) {
    return (
        <Exhibitor
            key={exhibitor._id}
            _id={exhibitor._id}
            name={exhibitor.name}
            contacts={exhibitor.contacts}
            createReservation={createReservation}
        />
    )
}

export function filterEditorByName(exhibitors, filterText) {
    let rows = []
    if(exhibitors) {
        exhibitors.map(exhibitor => {
            if (exhibitor && (exhibitor.name.toLowerCase().includes(filterText))) {
                rows.push(createExhibitor(exhibitor))
            }
        })
        return rows
    }
}

export function filterEditorByPotentialOnly(exhibitors) {
    let rows = []
    if(exhibitors) {
        exhibitors.map(exhibitor => {
            if (exhibitor && (exhibitor.isPotential)) {
                rows.push(createExhibitor(exhibitor))
            }
        })
        return rows
    }
}

// TODO faire la résa a partie de l'exposant
function createReservation(event) {

}

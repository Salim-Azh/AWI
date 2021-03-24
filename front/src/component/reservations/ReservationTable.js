import {Component} from "react"
import {Table} from "react-bootstrap";

const ReservationHandler = require("./ReservationHandler")

class ReservationTable extends Component {

    constructor(props) {
        super(props)
        this.rows = []
        this.state = {
            rows: []
        }
    }

    render() {
        let rows
        if(this.props.filter === "name") {
            rows = ReservationHandler.filterReservationByName(this.props.reservations, this.props.filterText.toLowerCase())
        }

        if(this.props.need_volunteer) {
            rows = ReservationHandler.filterEditorByVolunteer(this.props.reservations)
        }
        if(this.props.isEditorHere) {
            rows = ReservationHandler.filterEditorByEditorPresent(this.props.reservations)
        }
        if(this.props.reportSent) {
            rows = ReservationHandler.filterEditorByReportSent(this.props.reservations)
        }

        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Commentaire</th>
                    <th>état</th>
                    <th>Besoin de bénévoles ?</th>
                    <th>Editeur présent ?</th>
                    <th>CR envoyé ?</th>
                    <th>table</th>
                    <th>m²</th>
                    <th>Facture</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }
}

export default ReservationTable

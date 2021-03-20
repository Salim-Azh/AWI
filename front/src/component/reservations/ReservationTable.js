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
        else {
        }
        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }
}

export default ReservationTable

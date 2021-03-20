import {Component} from "react"
import {Table} from "react-bootstrap";

const BillHandler = require("./BillHandler")

class BillTable extends Component {

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
            rows = BillHandler.filterBillByName(this.props.bills, this.props.filterText.toLowerCase())
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

export default BillTable

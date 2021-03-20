import {Component} from "react"
import {Table} from "react-bootstrap";

const ZoneHandler = require("./ZoneHandler")

class ZoneTable extends Component {

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
            rows = ZoneHandler.filterZoneByName(this.props.zones, this.props.filterText.toLowerCase())
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

export default ZoneTable

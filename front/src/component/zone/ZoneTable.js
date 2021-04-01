import {Component} from "react"
import {Table} from "react-bootstrap";

const ZoneHandler = require("./ZonesHandler")

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
            rows = ZoneHandler.filterZonesByName(this.props.response, this.props.filterText.toLowerCase())
        }
        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom de la zone</th>
                    <th>Capacité</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
    )
    }
}

export default ZoneTable

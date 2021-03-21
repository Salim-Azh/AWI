import {Component} from "react"
import {Col, Row} from "react-bootstrap";

const FestivalHandler = require("./FestivalHandler")

class FestivalTable extends Component {

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
            rows = FestivalHandler.filterFestivalByName(this.props.festivals, this.props.filterText.toLowerCase())
        }
        return (
            <Row>
                {rows}
            </Row>
        )
    }
}

export default FestivalTable

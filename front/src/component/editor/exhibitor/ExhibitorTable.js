import {Component} from "react"
import React from "react"

import {Table} from "react-bootstrap";

const ExhibitorHandler = require("./ExhibitorHandler")

class EditorTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rows: []
        }
    }
    render() {
        let rows

        if(this.props.filter === "name") {
            rows = ExhibitorHandler.filterEditorByName(this.props.exhibitors, this.props.filterText)
        }
        else {
            rows = ExhibitorHandler.filterEditorByPotentialOnly(this.props.exhibitors)
        }

        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Contact</th>
                    <th/>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }
}

export default EditorTable

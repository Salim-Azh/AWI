import {Component} from "react"
import React from "react"

import {Table} from "react-bootstrap";

const EditorHandler = require("./EditorHandler")

class EditorTable extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rows: []
        }
    }

    // TODO faire état de la résa
    render() {
        let rows

        if(this.props.editorOnly) {
            rows = EditorHandler.filterEditorByEditorOnly(this.props.editors)
        }
        else if(this.props.exhibitorOnly) {
            rows = EditorHandler.filterEditorByExhibitorOnly(this.props.editors)
        }
        else {
            rows = EditorHandler.filterEditorByName(this.props.editors, this.props.filterText.toLowerCase())
        }

        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Etat de réservation</th>
                    <th>Contact</th>
                    <th>Editeur</th>
                    <th>Exposant</th>
                    <th>Potentiel</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }
}

export default EditorTable

import {Component} from "react"
import {Table} from "react-bootstrap";

const EditorFollowUpHandler = require("./EditorFollowUpHandler")

class EditorFollowUpTable extends Component {

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
            rows = EditorFollowUpHandler.filterEditorByName(this.props.editors, this.props.filterText.toLowerCase())
        }

        if(this.props.needVolunteer) {
            rows = EditorFollowUpHandler.filterEditorByVolunteer(this.props.editors)
        }
        if(this.props.isEditorHere) {
            rows = EditorFollowUpHandler.filterEditorByEditorPresent(this.props.editors)
        }
        if(this.props.reportSent) {
            rows = EditorFollowUpHandler.filterEditorByReportSent(this.props.editors)
        }

        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Commentaire</th>
                    <th>1er contact</th>
                    <th>2ème contact</th>
                    <th>3ème Contact</th>
                    <th>état</th>
                    <th>Besoin de bénévoles ?</th>
                    <th>Présent ?</th>
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

export default EditorFollowUpTable

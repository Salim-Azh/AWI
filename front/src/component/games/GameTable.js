import {Component} from "react"
import {Table} from "react-bootstrap";

const GameHandler = require("./GamesHandler")

class GameTable extends Component {

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
            rows = GameHandler.filterGamesByName(this.props.response, this.props.filterText.toLowerCase())
        }
        else if(this.props.filter === "category") {
            rows = GameHandler.filterGamesByCategory(this.props.response, this.props.filterText.toLowerCase())
        } else if(this.props.filter === "editor") {
            rows = GameHandler.filterGamesByEditor(this.props.response, this.props.filterText.toLowerCase())
        } else if(this.props.filter === "zone") {
            rows = GameHandler.filterGamesByZone(this.props.response, this.props.filterText.toLowerCase())
        } else if(this.props.filter === "state") {
            rows = GameHandler.filterGamesByState(this.props.response, this.props.filterText.toLowerCase())
        }
        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom du jeu</th>
                    <th>Editeur</th>
                    <th>Etat</th>
                    <th>Catégorie</th>
                    <th>Durée en minutes</th>
                    <th>Âge requis</th>
                    <th>Zone</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
    )
    }
}

export default GameTable

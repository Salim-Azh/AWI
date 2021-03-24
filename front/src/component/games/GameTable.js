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
        } else {
            rows = GameHandler.filterGamesByEditor(this.props.response, this.props.filterText.toLowerCase())
        }
        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom du jeu</th>
                    <th>Editeur</th>
                    <th>Catégorie</th>
                    <th>Durée en minutes</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
    )
    }
}

export default GameTable

import {Component} from "react"
import {Table} from "react-bootstrap";

const gameHandler = require("./GamesHandler")

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
            rows = gameHandler.filterGamesByName(this.props.games, this.props.filterText.toLowerCase())
        }
        else {
            rows = gameHandler.filterGamesByCategory(this.props.games, this.props.filterText.toLowerCase())
        }
        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom du jeu</th>
                    <th>Catégorie</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
    )
    }
}

export default GameTable

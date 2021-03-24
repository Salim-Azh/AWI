import {Component} from "react"
import {Table} from "react-bootstrap";

const GameHandler = require("../games/GamesHandler")

class EditorGamesTable extends Component {

    constructor(props) {
        super(props)
        this.rows = []
        this.state = {
            rows: []
        }
    }

    render() {
        const rows = this.props.editor.games.map(game =>
                GameHandler.createGameFromEditor(game)
            )

        return (
            <Table striped bordered hover size={"sm"}>
                <thead>
                <tr>
                    <th>Nom du jeu</th>
                    <th>Catégorie</th>
                    <th>Durée en minutes</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        )
    }
}

export default EditorGamesTable

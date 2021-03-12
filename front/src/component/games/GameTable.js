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

    componentDidMount() {
        gameHandler.getGamesFromDB()
            .then(games => {
                this.setState({
                    rows: games
                })
        })
    }

    render() {
        let rows
        if(this.props.filter === "name") {
            rows = gameHandler.filterGamesByName(this.state.rows, this.props.filterText.toLowerCase())
        }
        else {
            rows = gameHandler.filterGamesByCategory(this.state.rows, this.props.filterText.toLowerCase())
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

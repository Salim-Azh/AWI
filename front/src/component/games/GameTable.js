import {Component} from "react"

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

        const rows = gameHandler.filterGames(this.state.rows, this.props.filterText.toLowerCase())
        return (
            <table>
                <thead>
                <tr>
                    <th>Nom du jeu</th>
                    <th>Catégorie</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}

export default GameTable

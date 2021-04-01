import {Component} from "react"
import {Tab, Tabs} from "react-bootstrap";
import FilteredGamesTable from "./FilteredGamesTable";

const GameHandler = require("./GamesHandler")

class TabsGames extends Component {

    constructor(props) {
        super(props);
        this.state = {
            games: ""
        }
        this.handleAddGames = this.handleAddGames.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        GameHandler.getGamesFromDB()
            .then(games => {
                this.setState({
                    games: games
                })
            })
        GameHandler.setHandleDelete(this.handleDelete)
    }

    handleAddGames(game) {
        GameHandler.addGames(game)
            .then(response => response.json())
            .then(response => game._id = response.gameId)
            .then(() => this.state.games.push(game))
            .then(() => this.setState({games: this.state.games}))
    }

    handleDelete(gameId) {
        this.setState({
            games: this.state.games.filter(game => {
                return game._id !== gameId
            })
        })
    }

    render() {
        return (
            <Tabs
                defaultActiveKey="allGames"
            >
                <Tab eventKey="allGames" title="Jeux">
                    <FilteredGamesTable
                        games={this.state.games}
                    />
                </Tab>
                <Tab eventKey="festivalGames" title="Jeu du festival">
                    <FilteredGamesTable
                        games={this.state.games}
                    />
                </Tab>
            </Tabs>
        )
    }
}

export default TabsGames

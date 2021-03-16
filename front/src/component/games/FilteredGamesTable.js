import {Component} from "react"

import GameTable from "./GameTable"
import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Table} from "react-bootstrap";
import GameForm from "./GameForm";

const gameHandler = require("./GamesHandler")

class FilterableGamesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: "",
            filterText: "",
            filter: "name"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleAddGames = this.handleAddGames.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        gameHandler.getGamesFromDB()
            .then(games => {
                this.setState({
                    games: games
                })
            })
        gameHandler.setHandleDelete(this.handleDelete)
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        })
    }

    handleFilterChange(filter) {
        this.setState({
            filter: filter
        })
    }

    // TODO verifier la catégorie avant l'ajout
    handleAddGames(game) {
        gameHandler.addGames(game)
            .then(response => response.json())
            .then(response => game._id = response.gameId)
            .then(() => this.state.games.push(game))
            .then(() => this.setState({games: this.state.games}))
    }

    handleDelete(gameId) {
        this.setState({
            games: this.state.games.filter((game) => {
                return game._id !== gameId
            })
        })
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <td>
                            <Filter
                                onFilterChange={this.handleFilterChange}
                            />
                        </td>
                        <td>
                            <SearchBar
                                filterText={this.state.filterText}
                                filter={this.state.filter}
                                onFilterTextChange={this.handleFilterTextChange}
                            />
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <GameTable
                    games={this.state.games}
                    filterText={this.state.filterText}
                    filter={this.state.filter}
                />
                <GameForm handleClick={this.handleAddGames}/>
            </div>
        )
    }
}

export default FilterableGamesTable

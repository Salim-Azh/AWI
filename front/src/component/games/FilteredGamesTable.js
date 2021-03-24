import {Component} from "react"

import GameTable from "./GameTable"
import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Card, Table} from "react-bootstrap";
import FormContainer from "./FormContainer"

const GameHandler = require("./GamesHandler")

// TODO faire un tabs comme editeur pour tous les jeux ou les jeux du festival courant
class FilterableGamesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: "",
            filterText: "",
            filterEnglish: "name",
            filterFrench: "nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
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

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        })
    }

    handleFilterChange(filterEnglish, filterFrench) {
        this.setState({
            filterEnglish: filterEnglish,
            filterFrench: filterFrench
        })
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
            <div>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <td>
                            <Filter
                                filters={[
                                    {english: "name", french: "nom"},
                                    {english: "category", french: "catégorie"},
                                    {english: "editor", french: "éditeur"}
                                ]}
                                onFilterChange={this.handleFilterChange}
                            />
                        </td>
                        <td>
                            <SearchBar
                                filterText={this.state.filterText}
                                filter={{english: this.state.filterEnglish, french: this.state.filterFrench}}
                                onFilterTextChange={this.handleFilterTextChange}
                            />
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <Card style={{width: '4rem'}}>
                    <FormContainer handleClick={this.handleAddGames}/>
                </Card>
                <GameTable
                    response={this.state.games}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
            </div>
        )
    }
}

export default FilterableGamesTable

import {Component} from "react"

import GameTable from "./GameTable"
import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Card, Table} from "react-bootstrap";
import FormContainer from "../Modal/FormContainer"

// TODO faire un tabs comme editeur pour tous les jeux ou les jeux du festival courant
class FilterableGamesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: "",
            filterEnglish: "name",
            filterFrench: "nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
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

    // TODO faire état du jeu de la résa
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
                                    {english: "editor", french: "éditeur"},
                                    {english: "state", french: "état"},
                                    {english: "category", french: "catégorie"},
                                    {english: "zone", french: "zone"}
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
                    <FormContainer
                        title={"Ajouter un jeu"}
                        component={"GameForm"}
                        handleClick={this.handleAddGames}/>
                </Card>
                <GameTable
                    response={this.props.games}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
            </div>
        )
    }
}

export default FilterableGamesTable

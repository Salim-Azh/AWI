import {Component} from "react"

import GameTable from "./GameTable"
import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Table} from "react-bootstrap";

class FilterableGamesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: "",
            filter: "name"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
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
                                    {english: "category", french: "catégorie"}
                                ]}
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
                    games={this.props.games}
                    filterText={this.state.filterText}
                    filter={this.state.filter}
                />
            </div>
        )
    }
}

export default FilterableGamesTable

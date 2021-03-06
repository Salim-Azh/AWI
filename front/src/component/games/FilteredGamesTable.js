import {Component} from "react"

import GameTable from "./GameTable"
import SearchBar from "../search/Search";
import Filter from "../search/Filter";

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
                <Filter
                    onFilterChange={this.handleFilterChange}
                />
                <SearchBar
                    filterText={this.state.filterText}
                    filter={this.state.filter}
                    onFilterTextChange={this.handleFilterTextChange}
                />
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

import GameTable from "./GameTable"
import SearchBar from "../search/Search";
import {Component} from "react"

class FilterableGamesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        })
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextChange={this.handleFilterTextChange}
                />
                <GameTable
                    games={this.props.games}
                    filterText={this.state.filterText}
                />
            </div>
        )
    }
}

export default FilterableGamesTable

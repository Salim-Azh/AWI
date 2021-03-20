import {Component} from "react"

import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Card, Table} from "react-bootstrap";
import TableList from "./TableList";
import FormContainer from "./FormContainer";
const TableHandler = require("./TableHandler")

class FilterableTablesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tables: "",
            filterText: "",
            filterEnglish: "name",
            filterFrench: "Nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleAddTable = this.handleAddTable.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        TableHandler.getTablesFromDB()
            .then(tables => {
                this.setState({
                    tables: tables
                })
            })
        TableHandler.setHandleDelete(this.handleDelete)
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

    handleAddTable(table) {
        TableHandler.addTable(table)
            .then(response => response.json())
            .then(response => table._id = response.tableId)
            .then(() => this.state.tables.push(table))
            .then(() => this.setState({Tables: this.state.Tables}))
    }

    handleDelete(tableId) {
        this.setState({
            tables: this.state.tables.filter((table) => {
                return table._id !== tableId
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
                    <FormContainer handleClick={this.handleAddTable}/>
                </Card>
                <TableList
                    tables={this.state.tables}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
            </div>
        )
    }
}

export default FilterableTablesList

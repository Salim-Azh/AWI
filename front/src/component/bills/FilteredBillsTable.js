import {Component} from "react"

import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Table} from "react-bootstrap";
import BillTable from "./BillTable";
const BillHandler = require("./BillHandler")

class FilterableBillsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bills: "",
            filterText: "",
            filterEnglish: "name",
            filterFrench: "Nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleAddBill = this.handleAddBill.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        BillHandler.getBillsFromDB()
            .then(Bills => {
                this.setState({
                    Bills: Bills
                })
            })
        BillHandler.setHandleDelete(this.handleDelete)
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

    handleAddBill(bill) {
        BillHandler.addBill(bill)
            .then(response => response.json())
            .then(response => bill._id = response.billId)
            .then(() => this.state.bills.push(bill))
            .then(() => this.setState({bills: this.state.bills}))
    }

    handleDelete(billId) {
        this.setState({
            bills: this.state.bills.filter((bill) => {
                return bill._id !== billId
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
                <BillTable
                    bills={this.state.bills}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
            </div>
        )
    }
}

export default FilterableBillsTable

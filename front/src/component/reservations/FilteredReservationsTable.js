import {Component} from "react"

import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Card, Table} from "react-bootstrap";
import ReservationTable from "./ReservationTable";
import FormContainer from "../Modal/FormContainer";
import FilterCheck from "../search/FilterCheck";

class FilterableReservationsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editors: "",
            filterText: "",
            need_volunteer: false,
            reportSent: false,
            isEditorHere: false,
            filterEnglish: "name",
            filterFrench: "nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleFilterCheckedChange = this.handleFilterCheckedChange.bind(this)
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

    handleFilterCheckedChange(event) {
        const target = event.target
        const name = target.name
        const value = target.checked

        if(name === "need_volunteer"){
            this.state.need_volunteer = value
        } else if(name === "reportSent") {
            this.state.reportSent = value
        } else {
            this.state.isEditorHere = value
        }
        this.setState({[name]: value})
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
                                    {english: "state", french: "état"}
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
                    <tr>
                        <FilterCheck
                            onChecked={this.handleFilterCheckedChange}
                            need_volunteer={this.state.need_volunteer}
                            reportSent={this.state.reportSent}
                            isEditorHere={this.state.isEditorHere}
                            />
                    </tr>
                    </tbody>
                </Table>
                <Card style={{width: '4rem'}}>
                    <FormContainer
                        title={"Créer une réservation"}
                        component={"ReservationForm"}
                        exhibitors={this.props.exhibitors}
                        handleClick={this.props.handleAddReservation}
                    />
                </Card>
                <ReservationTable
                    reservations={this.props.reservations}
                    need_volunteer={this.state.need_volunteer}
                    reportSent={this.state.reportSent}
                    isEditorHere={this.state.isEditorHere}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
            </div>
        )
    }
}

export default FilterableReservationsTable

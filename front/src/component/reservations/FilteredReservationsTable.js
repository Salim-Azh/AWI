import {Component} from "react"

import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Card, Table} from "react-bootstrap";
import ReservationTable from "./ReservationTable";
import FormContainer from "../Modal/FormContainer";
import FilterCheck from "../search/FilterCheck";
const ReservationHandler = require("./ReservationHandler")
const EditorHandler = require("../editor/EditorHandler")

class FilterableReservationsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservations: [{}],
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
        this.handleAddReservation = this.handleAddReservation.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        ReservationHandler.getReservationsFromDB()
            .then(reservations => {
                this.setState({
                    reservations: reservations
                })
            })
        ReservationHandler.setHandleDelete(this.handleDelete)
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
            console.log(this.state.need_volunteer)
        } else if(name === "reportSent") {
            this.state.reportSent = value
            console.log(this.state.reportSent)
        } else {
            this.state.isEditorHere = value
            console.log(this.state.isEditorHere)
        }
        this.setState({[name]: value})
        this.setState({
            [name]: value
        })
    }

    handleAddReservation(reservation) {
        ReservationHandler.addReservation(reservation)
            .then(response => response.json())
            .then(response => reservation._id = response._id)
            .then(() => this.state.reservations.push(reservation))
            .then(() => this.setState({reservations: this.state.reservations}))
    }

    handleDelete(reservationId) {
        this.setState({
            reservations: this.state.reservations.filter((reservation) => {
                return reservation._id !== reservationId
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
                        handleClick={this.handleAddReservation}/>
                </Card>
                <ReservationTable
                    reservations={this.state.reservations}
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

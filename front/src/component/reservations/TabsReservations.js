import {Component} from "react"
import {Tab, Tabs} from "react-bootstrap";
import FilteredReservationsTable from "./FilteredReservationsTable";
import FilteredEditorsTable from "../editor/FilteredEditorsTable";

const ExhibitorHandler = require("../editor/exhibitor/ExhibitorHandler")
const ReservationHandler = require("../reservations/ReservationHandler")

class TabsReservations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exhibitors: "",
            reservations: [{}]
        }
        this.handleAddReservation = this.handleAddReservation.bind(this)
    }

    componentDidMount() {
        ExhibitorHandler.getExhibitorsFromDB()
            .then(exhibitors =>
                this.setState({exhibitors: exhibitors})
            )
        ReservationHandler.getReservationsFromDB()
            .then(reservations => {
                this.setState({
                    reservations: reservations
                })
            })
        ReservationHandler.setAddHandler(this.handleAddReservation)
    }

    handleAddReservation(reservation) {
        console.log(reservation)
        ReservationHandler.addReservation(reservation)
            .then(response => response.json())
            .then(res => res.response)
            .then(res => this.state.reservations.push({
                reservation: res.reservation,
                exhibitor: res.exhibitor
            }))
            .then(() => this.setState({reservations: this.state.reservations}))
    }

    render() {
        return (
            <Tabs
                defaultActiveKey="exposant"
            >
                <Tab eventKey="exposant" title="Exposant">
                    <FilteredEditorsTable exhibitorOnly={true} potentialOnly={true}
                                          exhibitors={this.state.exhibitors}
                    />
                </Tab>
                <Tab eventKey="reservation" title="Suivi réservations">
                    <FilteredReservationsTable
                        reservations={this.state.reservations}
                        exhibitors={this.state.exhibitors}
                        handleAddReservation={this.handleAddReservation}
                    />
                </Tab>
            </Tabs>
        )
    }
}

export default TabsReservations

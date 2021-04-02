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
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdateCheck = this.handleUpdateCheck.bind(this)
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
        ReservationHandler.setHandleDelete(this.handleDelete)
        ReservationHandler.setUpdateHandlerCheck(this.handleUpdateCheck)
    }

    handleAddReservation(reservation) {
        ReservationHandler.addReservation(reservation)
            .then(response => response.json())
            .then(res => res.response)
            .then(res => this.state.reservations.push({
                reservation: res.reservation,
                exhibitor: res.exhibitor
            }))
            .then(() => this.setState({reservations: this.state.reservations}))
    }

    handleDelete(reservationId) {
        this.setState({
            reservations: this.state.reservations.filter((reservation) => {
                return reservation.reservation._id !== reservationId
            })
        })
    }

    handleUpdateCheck(reservationId, attribute, checked) {
        const reservation = this.state.reservations.filter((reservation) => {
            return reservation.reservation._id === reservationId
        })

        if(attribute === "need_volunteer") {
            reservation[0].reservation.need_volunteer = checked
        } else if(attribute === "reportSent") {
            reservation[0].reservation.reportSent = checked
        } else {
            reservation[0].reservation.isEditorHere = checked
        }
        this.setState({reservations: this.state.reservations})
    }

    render() {
        return (
            <Tabs
                defaultActiveKey="reservation"
            >
                <Tab eventKey="reservation" title="Suivi réservations">
                    <FilteredReservationsTable
                        reservations={this.state.reservations}
                        exhibitors={this.state.exhibitors}
                        handleAddReservation={this.handleAddReservation}
                    />
                </Tab>
                <Tab eventKey="exposant" title="Exposant">
                    <FilteredEditorsTable exhibitorOnly={true} potentialOnly={true}
                                          exhibitors={this.state.exhibitors} showSearch={true}
                    />
                </Tab>
            </Tabs>
        )
    }
}

export default TabsReservations

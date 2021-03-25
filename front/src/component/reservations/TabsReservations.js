import {Component} from "react"
import {Tab, Tabs} from "react-bootstrap";
import FilteredReservationsTable from "./FilteredReservationsTable";
import FilteredEditorsTable from "../editor/FilteredEditorsTable";

const ExhibitorHandler = require("../editor/exhibitor/ExhibitorHandler")

class TabsReservations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exhibitors: ""
        }
    }

    componentDidMount() {
        ExhibitorHandler.getExhibitorsFromDB()
            .then(exhibitors =>
                this.setState({exhibitors: exhibitors})
            )
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
                    <FilteredReservationsTable exhibitors={this.state.exhibitors}/>
                </Tab>
            </Tabs>
        )
    }
}

export default TabsReservations

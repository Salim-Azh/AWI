import {Tab, Tabs} from "react-bootstrap";
import FilteredReservationsTable from "./FilteredReservationsTable";
import FilteredEditorFollowUpTable from "../editor/FollowUp/FilteredEditorFollowUpTable";

function TabsReservations() {

    // TODO ne faire afficher que les exposant
    return (
        <Tabs
            defaultActiveKey="exposant"
        >
            <Tab eventKey="exposant" title="Exposant" >
                <FilteredEditorFollowUpTable/>
            </Tab>
            <Tab eventKey="followUp" title="Suivi réservations">
                <FilteredReservationsTable />
            </Tab>
        </Tabs>
    );
}

export default TabsReservations

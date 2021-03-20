import {Component} from "react"

import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Card, Table} from "react-bootstrap";
import ZoneTable from "./ZoneTable";
import FormContainer from "./FormContainer";
const ZoneHandler = require("./ZoneHandler")

class FilterableZonesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            zones: "",
            filterText: "",
            filterEnglish: "name",
            filterFrench: "Nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleAddZone = this.handleAddZone.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        ZoneHandler.getZonesFromDB()
            .then(zones => {
                this.setState({
                    zones: zones
                })
            })
        ZoneHandler.setHandleDelete(this.handleDelete)
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

    handleAddZone(zone) {
        ZoneHandler.addZone(zone)
            .then(response => response.json())
            .then(response => zone._id = response.zoneId)
            .then(() => this.state.zones.push(zone))
            .then(() => this.setState({zones: this.state.zones}))
    }

    handleDelete(zoneId) {
        this.setState({
            zones: this.state.zones.filter((zone) => {
                return zone._id !== zoneId
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
                    <FormContainer handleClick={this.handleAddZone}/>
                </Card>
                <ZoneTable
                    zones={this.state.zones}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
            </div>
        )
    }
}

export default FilterableZonesTable

import {Component} from "react"

import ZoneTable from "./ZoneTable"
import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Card, Table} from "react-bootstrap";
import FormContainer from "../Modal/FormContainer"

const ZoneHandler = require("./ZonesHandler")

// TODO faire un tabs comme editeur pour tous les jeux ou les jeux du festival courant
class FilterableZonesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            zones: [],
            filterText: "",
            filterEnglish: "name",
            filterFrench: "nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleAddZone = this.handleAddZone.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        ZoneHandler.getZonesFromDB()
            .then(zones => this.setState({zones: zones}))
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
        ZoneHandler.addZones(zone)
            .then(response => response.json())
            .then(res => this.state.zones.push(res))
            .then(() => this.setState({zones: this.state.zones}))
    }

    handleDelete(zoneId) {
        this.setState({
            zones: this.state.zones.filter(zone => {
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
                                    {english: "name", french: "nom"}
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
                    <FormContainer
                        title={"Ajouter une zone"}
                        component={"ZoneForm"}
                        handleClick={this.handleAddZone}/>
                </Card>
                <ZoneTable
                    response={this.state.zones}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
            </div>
        )
    }
}

export default FilterableZonesTable

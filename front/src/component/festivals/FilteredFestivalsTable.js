import {Component} from "react"

import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Card, Table} from "react-bootstrap";
import FestivalTable from "./FestivalTable";
import FormContainer from "../Modal/FormContainer";
const FestivalHandler = require("./FestivalHandler")


// TODO ajouter un retour sur modification
class FilterableFestivalsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            festivals: "",
            filterText: "",
            filterEnglish: "name",
            filterFrench: "nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleAddFestival = this.handleAddFestival.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidMount() {
        FestivalHandler.getFestivalsFromDB()
            .then(festivals => {
                this.setState({
                    festivals: festivals
                })
            })
        FestivalHandler.setHandleDelete(this.handleDelete)
        FestivalHandler.setHandleUpdate(this.handleUpdate)
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

    handleAddFestival(festival) {
        FestivalHandler.addFestival(festival)
            .then(response => response.json())
            .then(response => festival._id = response.festivalId)
            .then(() => this.state.festivals.push(festival))
            .then(() => this.setState({festivals: this.state.festivals}))
    }

    handleDelete(festivalId) {
        this.setState({
            festivals: this.state.festivals.filter((festival) => {
                return festival._id !== festivalId
            })
        })
    }

    handleUpdate(festivalId, checked) {
        const festival = this.state.festivals.filter(festival => {
            return festival._id === festivalId
        })
        festival[0].is_current = checked
        this.setState({festivals: this.state.festivals})
    }

    render() {
        return (
            <>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <td>
                            <Filter
                                filters={[
                                    {english: "name", french: "nom"},
                                    {english: "year", french: "année"}
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
                        title={"Ajouter un festival"}
                        component={"FestivalForm"}
                        handleClick={this.handleAddFestival}/>
                </Card>
                <FestivalTable
                    festivals={this.state.festivals}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
            </>
        )
    }
}

export default FilterableFestivalsTable

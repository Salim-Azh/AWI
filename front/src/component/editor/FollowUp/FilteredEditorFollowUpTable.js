import {Component} from "react"

import SearchBar from "../../search/Search";
import Filter from "../../search/Filter";
import {Table} from "react-bootstrap";
import EditorFollowUpTable from "./EditorFollowUpTable";
import FilterCheck from "../../search/FilterCheck";
const EditorFollowUpHandler = require("./EditorFollowUpHandler")

class FilterableEditorFollowUpTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editors: "",
            filterText: "",
            filterEnglish: "name",
            filterFrench: "Nom",
            needVolunteer: "",
            isEditorHere: "",
            reportSent: ""
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleFilterCheckedChange = this.handleFilterCheckedChange.bind(this)
    }

    componentDidMount() {
        EditorFollowUpHandler.getEditorsFollowUpFromDB()
            .then(editors => {
                this.setState({
                    editors: editors
                })
            })
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

    handleFilterCheckedChange(filterName, value) {
        this.setState({
            [filterName]: value
        })
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th/>
                        <th/>
                    </tr>
                    <tr>
                        <th colSpan={2}/>
                    </tr>
                    </thead>
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
                        <td>
                            <FilterCheck
                                filters={[
                                    {english: "needVolunteer", french: "Besoins de bénévoles ?"},
                                    {english: "isEditorHere", french: "Editeur présent ?"},
                                    {english: "reportSent", french: "CR envoyé ?"}
                                ]}
                                onChecked={this.handleFilterCheckedChange}
                            />
                        </td>
                    </tr>
                    </tbody>
                </Table>
                <EditorFollowUpTable
                    editors={this.state.editors}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                    needVolunteer={this.state.needVolunteer}
                    isEditorHere={this.state.isEditorHere}
                    reportSent={this.state.reportSent}
                />
            </div>
        )
    }
}

export default FilterableEditorFollowUpTable

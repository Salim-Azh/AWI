import {Component} from "react"

import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Card, Table} from "react-bootstrap";
import EditorTable from "./EditorTable";
import FormContainer from "../Modal/FormContainer";
import ExhibitorTable from "./exhibitor/ExhibitorTable";
import EditorForm from "./EditorForm";

class FilterableEditorsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: "",
            filterEnglish: "name",
            filterFrench: "nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleAddEditor = this.handleAddEditor.bind(this)
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

    handleAddEditor(editor) {
        this.props.handleAddEditor(editor)
    }

    render() {
        let cardForm

        if(this.props.showForm) {
            cardForm = (
                <Card style={{width: '4rem'}}>
                    <FormContainer
                        title={"Ajouter un éditeur/exposant"}
                        handleClick={this.handleAddEditor}
                        component={"EditorForm"}
                    />
                </Card>
            )
        }

        let table
        if(this.props.editors) {
            table = (
                <EditorTable
                    editors={this.props.editors}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                    editorOnly={this.props.editorOnly}
                    exhibitorOnly={this.props.exhibitorOnly}
                    potentialOnly={this.props.potentialOnly}
                />
            )
        }

        else {
            table = (
                <ExhibitorTable
                    exhibitors={this.props.exhibitors}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
            )
        }
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
                {cardForm}
                {table}
            </div>
        )
    }
}

export default FilterableEditorsTable

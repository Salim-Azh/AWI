import {Component} from "react"

import SearchBar from "../search/Search";
import Filter from "../search/Filter";
import {Table} from "react-bootstrap";
import EditorTable from "./EditorTable";
import EditorForm from "./EditorForm";
const EditorHandler = require("./EditorHandler")

class FilterableEditorsTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editors: "",
            filterText: "",
            filterEnglish: "name",
            filterFrench: "Nom"
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleAddEditor = this.handleAddEditor.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        EditorHandler.getEditorsFromDB()
            .then(editors => {
                this.setState({
                    editors: editors
                })
            })
        EditorHandler.setHandleDelete(this.handleDelete)
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
        EditorHandler.addEditor(editor)
            .then(response => response.json())
            .then(response => editor._id = response.editorId)
            .then(() => this.state.editors.push(editor))
            .then(() => this.setState({editors: this.state.editors}))
    }

    handleDelete(editorId) {
        this.setState({
            editors: this.state.editors.filter((editor) => {
                return editor._id !== editorId
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
                <EditorTable
                    editors={this.state.editors}
                    filterText={this.state.filterText}
                    filter={this.state.filterEnglish}
                />
                <EditorForm handleClick={this.handleAddEditor}/>
            </div>
        )
    }
}

export default FilterableEditorsTable

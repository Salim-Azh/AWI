import {Component} from "react"

import {Tab, Tabs} from "react-bootstrap";
import FilteredEditorsTable from "./FilteredEditorsTable";

const EditorHandler = require("./EditorHandler")

class EditorTabs extends Component{

    constructor(props) {
        super(props);
        this.state = {editors: []}

        this.handleDelete = this.handleDelete.bind(this)
        this.handleAddEditor = this.handleAddEditor.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }

    componentDidMount() {
        EditorHandler.getEditorsFromDB()
            .then(editors =>
                this.setState({editors: editors})
            )
        EditorHandler.setHandleDelete(this.handleDelete)
        EditorHandler.setHandleUpdate(this.handleUpdate)
    }

    handleDelete(editorId) {
        this.setState({
            editors: this.state.editors.filter((editor) => {
                return editor._id !== editorId
            })
        })
    }

    handleUpdate(editorId, attribute, checked) {
        const editor = this.state.editors.filter((editor) => {
            return editor._id === editorId
        })

        if(attribute === "isEditor") {
            editor[0].isEditor = checked
        } else if(attribute === "isExhibitor") {
            editor[0].isExhibitor = checked
        } else {
            editor[0].isPotential = checked
        }
        this.setState({editors: this.state.editors})
    }

    handleAddEditor(editor) {
        EditorHandler.addEditor(editor)
            .then(response => response.json())
            .then(response => editor._id = response.editorId)
            .then(() => this.state.editors.push(editor))
            .then(() => this.setState({editors: this.state.editors}))
    }

    render() {
        return (
            <Tabs defaultActiveKey="all">
                <Tab eventKey="all" title="Tout">
                    <FilteredEditorsTable editorOnly={false} exhibitorOnly={false} potentialOnly={false}
                                          editors={this.state.editors} handleAddEditor={this.handleAddEditor}
                                          showForm={true} showSearch={true}
                    />
                </Tab>
                <Tab eventKey="Editeur" title="Editeur potentiel">
                    <FilteredEditorsTable editorOnly={true} exhibitorOnly={false} potentialOnly={true}
                                          editors={this.state.editors} handleAddEditor={this.handleAddEditor}
                                          showForm={false} showSearch={false}
                    />
                </Tab>
                <Tab eventKey="Exhibitor" title="Exposant potentiel">
                    <FilteredEditorsTable editorOnly={false} exhibitorOnly={true} potentialOnly={true}
                                          editors={this.state.editors} handleAddEditor={this.handleAddEditor}
                                          showForm={false} showSearch={false}
                    />
                </Tab>
            </Tabs>
        )
    }
}

export default EditorTabs

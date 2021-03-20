import {Component} from "react"

import {Tab, Tabs} from "react-bootstrap";
import FilteredEditorsTable from "./FilteredEditorsTable";

const EditorHandler = require("./EditorHandler")

class EditorTabs extends Component{

    constructor(props) {
        super(props);
        this.state = {
            editors: ""
        }
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        EditorHandler.getEditorsFromDB()
            .then(editors =>
                this.setState({editors: editors})
            )
        EditorHandler.setHandleDelete(this.handleDelete)
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
            <Tabs defaultActiveKey="all">
                <Tab eventKey="all" title="Tout">
                    <FilteredEditorsTable editorOnly={false} exhibitorOnly={false} potentialOnly={false}
                                          editors={this.state.editors}
                    />
                </Tab>
                <Tab eventKey="Editeur" title="Editeur">
                    <FilteredEditorsTable editorOnly={true} exhibitorOnly={false} potentialOnly={true}
                                          editors={this.state.editors}
                    />
                </Tab>
                <Tab eventKey="Exhibitor" title="Exposant">
                    <FilteredEditorsTable editorOnly={false} exhibitorOnly={true} potentialOnly={true}
                                          editors={this.state.editors}
                    />
                </Tab>
            </Tabs>
        )
    }
}

export default EditorTabs

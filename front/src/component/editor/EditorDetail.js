import {Component} from "react"
const EditorHandler = require("./EditorHandler")

class EditorDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: "",
            name: "",
            contacts: "",
            isEditor: "",
            isExhibitor: "",
            isPotential: ""
        }

    }

    componentDidMount() {
        EditorHandler.getEditorFromDB(window.location.href.split('/')[4])
            .then(editor => this.setState({
                _id: editor._id,
                name: editor.name,
                contacts: editor.contacts,
                isEditor: editor.isEditor,
                isExhibitor: editor.isExhibitor,
                isPotential: editor.isPotential
            }))
    }


    render() {
        return (
            <div>{this.state.name}</div>
        )
    }
}

export default EditorDetail

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
                _id: editor[0]._id,
                name: editor[0].name,
                contacts: editor[0].contacts,
                isEditor: editor[0].isEditor,
                isExhibitor: editor[0].isExhibitor,
                isPotential: editor[0].isPotential
            }))
            .then(() => console.log(this.state))
    }


    render() {
        return (
            <div>{this.state.name}</div>
        )
    }
}

export default EditorDetail

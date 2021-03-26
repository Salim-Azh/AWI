import {Component} from "react"
import {Form, FormControl, Button, FormGroup} from "react-bootstrap";

const EditorHandler = require("../editor/EditorHandler")

class GameForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editors: [],
            name: "",
            min_yearold: "",
            category: "",
            duration: "",
            editor: {_id: "", name: ""},
            zone: "",
            countPlayer: "",
            prototype: "",
            placed: "",
            recieved: "",
            need_volunteer: "",
            date: ""
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }
    componentDidMount() {
        EditorHandler.getEditorsFromDB()
            .then(editors => editors.map(editor => {
                if (editor && (editor.isEditor && editor.isPotential)) {
                    this.state.editors.push(editor)
                }
            }))
            .then(() => this.setState({
                editors: this.state.editors
            }))
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleEditorChange(event) {
        const target = event.target;
        const value = target.value;

        this.state.editor = {
            _id: value.split(',')[0],
            name: value.split(',')[1]
        }
        this.setState({
            editor: this.state.editor
        })
    }

    formIsUnchanged() {
        return (
            this.state.name === "" ||
            this.state.min_yearold === "" ||
            this.state.category === "" ||
            this.state.duration === "" ||
            this.state.editor._id === "" ||
            this.state.editor.name === ""
        )
    }

    submit() {
        // TODO faire un retour utilisateur
        if (this.formIsUnchanged()) {
            return
        }
        const editors = this.state.editors
        this.state.editors = []
        this.props.handleClick(this.state)
        this.setState({
            editors: editors,
            name: "",
            min_yearold: "",
            category: "",
            duration: "",
            editor: {_id: "", name: ""},
            zone: "",
            countPlayer: "",
            prototype: "",
            recieved: "",
            need_volunteer: "",
            date: ""
        })
    }

    render() {
        const rows = this.state.editors.map(editor =>
            <option key={editor._id} value={editor._id + "," + editor.name}>{editor.name}</option>
        )
        return (
            <Form>
                <FormGroup>
                    <Form.Label>Editeur</Form.Label>
                    <FormControl as={"select"} name="editor" onChange={this.handleEditorChange}>
                        <option value={""}>---</option>
                        {rows}
                    </FormControl>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Nom</Form.Label>
                    <FormControl as={"input"} name="name" type="text" value={this.state.name} placeholder="Nom du jeu"
                                 onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Âge requis</Form.Label>
                    <FormControl as={"input"} name="min_yearold" type="number" value={this.state.min_yearold} placeholder="Âge minimum"
                                 onChange={this.handleChange} min={0}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Catégorie</Form.Label>
                    <FormControl as={"select"} name="category" onChange={this.handleChange}>
                        <option value="">---</option>
                        <option value="enfant">enfant</option>
                        <option value="ambiance">ambiance</option>
                        <option value="famille">famille</option>
                    </FormControl>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Durée de partie</Form.Label>
                    <FormControl as={"input"} name="duration" type="number" value={this.state.duration} placeholder="Durée"
                                 onChange={this.handleChange} min={0}/>
                </FormGroup>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </Form>
        )
    }
}

export default GameForm

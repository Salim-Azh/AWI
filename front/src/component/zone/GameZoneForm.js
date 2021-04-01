import {Component} from "react"
import {Form, FormControl, Button, FormGroup} from "react-bootstrap";

const EditorHandler = require("../editor/EditorHandler")

class GamesBookedForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _id: props.reservationId,
            editor: {
                _id: "",
                name: "",
                games: []
            },
            gameSelected: {
                _id: "", name: "",
                editor: {
                    _id: "",
                    name: "",
                    games: []
                }
            },
            editors: []
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleGameChange = this.handleGameChange.bind(this)
    }
    componentDidMount() {
        EditorHandler.getEditorsFromDB()
            .then(editors => editors.filter(editor =>{
                return editor.isEditor
            }))
            .then(editors => this.setState({
                editors: editors
            }))
            .then(() =>
                EditorHandler.getGamesFromEditor(this.state.editors[0]._id)
                    .then(games => this.state.editors[0].games = games)
                    .then(() => this.setState({editors: this.state.editors}))
                    .then(() => this.setState({editor: this.state.editors[0]}))
                    .then(() => this.state.editor.games = this.state.editors[0].games)
                    .then(() => this.setState({editor: this.state.editor}))
                    .then(() => this.setState({
                        gameSelected: {
                            _id: this.state.editors[0].games[0]._id,
                            name: this.state.editors[0].games[0].name,
                            editor: this.state.editor
                        }
                    }))
            )
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
        const value = target.value

        const editor = this.state.editors.filter(editor => {
            return editor._id === value
        })

        this.setState({
                editor: editor[0]
            }, () => {
                EditorHandler.getGamesFromEditor(value)
                    .then(games => editor[0].games = games)
                    .then(() => this.setState({editor: editor[0]}))
            }
        )
    }

    handleGameChange(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
            gameSelected: {
                _id: value.split(',')[0],
                name: value.split(',')[1],
                editor: this.state.editor
            }})
    }

    submit() {
        this.props.handleClick(this.state.gameSelected)
    }

    render() {
        const editorRows = this.state.editors.map(editor =>
            <option key={editor._id} value={editor._id}>
                {editor.name}</option>
        )

        const editorGamesDefined = this.state.editor.games? this.state.editor.games: []
        const editorGames = editorGamesDefined.map(game =>
            <option value={game._id + "," + game.name}>{game.name}</option>
        )
        let form
        form = (
            <FormGroup>
                <Form.Label>Jeux</Form.Label>
                <FormControl as={"select"} onChange={this.handleGameChange}>
                    {editorGames}
                </FormControl>
            </FormGroup>
        )

        return (
            <Form>
                <FormGroup>
                    <Form.Label>Editeur</Form.Label>
                    <FormControl
                        as={"select"}
                        onChange={this.handleEditorChange}
                    >
                        {editorRows}
                    </FormControl>
                </FormGroup>

                {form}

                <Button onClick={this.submit} variant={"link"}>Ajouter à la réservation</Button>
            </Form>
        )
    }
}

export default GamesBookedForm

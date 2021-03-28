import {Component} from "react"
import {Form, FormControl, Button, FormGroup} from "react-bootstrap";
import GameForm from "../../games/GameForm";

const EditorHandler = require("../../editor/EditorHandler")
const GameHandler = require('../../games/GamesHandler')

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
            gameSelected: {_id: "", name: ""},
            editors: []
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
        this.handleAddGames = this.handleAddGames.bind(this)
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
                            name: this.state.editors[0].games[0].name
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
                name: value.split(',')[1]
            }})
    }

    handleAddGames(game) {
        GameHandler.addGames(game)
            .then(response => response.json())
            .then(response => game._id = response.gameId)
            .then(() => this.state.editor.games.push(game))
            .then(() => this.setState({editor: this.state.editor}))
    }

    submit() {
        const editors = this.state.editors
        this.state.editors = undefined
        this.props.handleClick(this.state.gameSelected)
        this.setState({
            editors: editors
        })
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
        if(editorGamesDefined.length > 0) {
            form = (
                <FormGroup>
                    <Form.Label>Jeux</Form.Label>
                    <FormControl as={"select"} onChange={this.handleGameChange}>
                        {editorGames}
                    </FormControl>
                </FormGroup>
            )
        } else {
            form = (
                <GameForm
                    editorId={this.state.editor._id}
                    editorName={this.state.editor.name}
                    handleClick={this.handleAddGames}
                />
            )
        }
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

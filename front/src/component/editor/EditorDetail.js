import {Component} from "react"
import {Redirect} from "react-router-dom"
import {Card, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import EditorGamesTable from "./EditorGamesTable";
import GameForm from "../games/GameForm";
import FormContainer from "../Modal/FormContainer";

const EditorHandler = require("./EditorHandler")
const GameHandler = require("../games/GamesHandler")

class EditorDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: "",
            name: "",
            contacts: [],
            isEditor: "",
            isExhibitor: "",
            isPotential: "",
            games: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleContactsChange = this.handleContactsChange.bind(this)
        this.submit = this.submit.bind(this)
        this.handleAddGame = this.handleAddGame.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        EditorHandler.getEditorFromDB(window.location.href.split('/')[5])
            .then(editor => this.setState({
                _id: editor._id,
                name: editor.name,
                contacts: editor.contacts,
                isEditor: editor.isEditor,
                isExhibitor: editor.isExhibitor,
                isPotential: editor.isPotential
            }))
            .then(() => EditorHandler.getGamesFromEditor(this.state._id)
                .then(games => this.setState({games: games}))
            )
            .then(() => GameHandler.setHandleDelete(this.handleDelete))
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleContactsChange(event) {
        const target = event.target
        const value = target.value
        const index = target.name;

        let contacts = this.state.contacts
        contacts[index] = value

        this.setState({contacts: contacts})
    }

    submit() {
        EditorHandler.updateEditor(this.state)
            .then(() => this.setState({redirect: "/nav/editeurs"}))
    }

    handleAddGame(game) {
        GameHandler.addGames(game)
            .then(response => response.json())
            .then(response => game._id = response.gameId)
            .then(() => this.state.games.push(game))
            .then(() => this.setState({games: this.state.games}))
    }

    handleDelete(gameId) {
        this.setState({
            games: this.state.games.filter(game => {
                return game._id !== gameId
            })
        })
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        const rows = this.state.contacts.map((contact, index) =>
            <FormControl
                as={"input"} type={"text"} value={contact} key={index}
                onChange={this.handleContactsChange} name={index}/>
        )

        let games
        if(this.state.isEditor) {
            games = (
                <>
                <Form.Label>Jeux de l'éditeur</Form.Label>
                    <Card style={{width: '4rem'}}>
                    <FormContainer
                        title={"Ajouter un jeu à l'éditeur"}
                        component={"GameForm"}
                        handleClick={this.handleAddGame}
                        editorId={this.state._id}
                        editorName={this.state.name}
                    />
                    </Card>
                <EditorGamesTable
                    editor={this.state}
                />
                </>
                )
        }

        return (
            <Card>
            <Form>
                <FormGroup>
                    <Form.Label>Nom de l'entreprise</Form.Label>
                    <FormControl
                        as={"input"} value={this.state.name} type={"text"}
                        onChange={this.handleChange} name={"name"}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Contacts</Form.Label>
                    {rows}
                </FormGroup>

                <FormGroup>
                    <Row>
                        <Col>
                            <Form.Check checked={this.state.isEditor} label={"Editeur ?"}
                                        onChange={this.handleChange} id={this.state._id} name={"isEditor"}/>
                        </Col>
                        <Col>
                            <Form.Check checked={this.state.isExhibitor} label={"Exposant ?"}
                                        onChange={this.handleChange} id={this.state._id} name={"isExhibitor"}/>
                        </Col>
                        <Col>
                            <Form.Check checked={this.state.isPotential} label={"Potentiel ?"}
                                        onChange={this.handleChange} id={this.state._id} name={"isPotential"}/>
                        </Col>
                    </Row>
                </FormGroup>

                {games}

                <Button onClick={this.submit} variant={"outline-success"}>Sauvegarder</Button>
            </Form>
            </Card>
        )
    }
}

export default EditorDetail

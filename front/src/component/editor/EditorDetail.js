import {Component} from "react"
import {Redirect} from "react-router-dom"
import {Card, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import GameTable from "../games/GameTable";
const EditorHandler = require("./EditorHandler")

// TODO faire le bouton delete game ^pour un jeu de l'editeur
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
            .then(() => EditorHandler.getGamesFromEditor(this.state._id)
                .then(games => this.setState({games: games}))
            )
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
            .then(() => this.setState({redirect: "/editeurs"}))
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
            if(this.state.games.length > 0) {
                games = (
                    <FormGroup>
                        <Form.Label>Jeux de l'éditeur</Form.Label>
                        <GameTable
                            games={this.state.games}
                            filter={"name"}
                            filterText={""}
                        />
                    </FormGroup>
                )
            } else {
                games = <div>Ajouter un jeu à l'éditeur</div>
            }
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

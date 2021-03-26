import {Component} from "react"
import {Redirect} from "react-router-dom"
import {Card, Form, FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const GamesHandler = require("./GamesHandler")
const EditorHandler = require("../editor/EditorHandler")

class GameDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            name: "",
            category: "",
            duration: "",
            min_yearold: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        GamesHandler.getGameFromDB(window.location.href.split('/')[5])
            .then(res => this.setState({
                _id: res.game._id,
                name: res.game.name,
                category: res.game.category,
                duration: res.game.duration,
                min_yearold: res.game.min_yearold,
                editor: res.editor
            }))
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    submit() {
        GamesHandler.updateGame(this.state)
            .then(() => this.setState({redirect: "/nav/jeux"}))
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <Form style={{margin: '1em'}}>
                <FormGroup>
                    <Form.Label>Nom du jeu</Form.Label>
                    <FormControl
                        as={"input"} value={this.state.name} type={"text"}
                        onChange={this.handleChange} name={"name"}/>
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
                    <Form.Label>Durée</Form.Label>
                    <FormControl
                        as={"input"} value={this.state.duration} type={"number"} min={0}
                        onChange={this.handleChange} name={"duration"}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>âge requis</Form.Label>
                    <FormControl
                        as={"input"} value={this.state.min_yearold} type={"number"} min={0}
                        onChange={this.handleChange} name={"min_yearold"}/>
                </FormGroup>

                <Button onClick={this.submit} variant={"outline-success"}>Sauvegarder</Button>
            </Form>
        )
    }
}

export default GameDetail

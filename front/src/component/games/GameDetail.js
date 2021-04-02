import {Component} from "react"
import {Redirect} from "react-router-dom"
import {Form, FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const GamesHandler = require("./GamesHandler")

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
                _id: res._id,
                name: res.name,
                category: res.category,
                duration: res.duration,
                min_yearold: res.min_yearold,
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
        const optionsCategory = [
            "Famille",
            "Ambiance",
            "Expert",
            "Enfant",
            "Classiqe",
            "Famille+"
        ]

        const category = optionsCategory.map(cat =>
            <option value={cat}>{cat}</option>
        )

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
                    <FormControl as={"select"} name="category" value={this.state.category} onChange={this.handleChange}>
                        {category}
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

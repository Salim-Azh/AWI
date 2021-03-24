import {Component} from "react"
import {Redirect} from "react-router-dom"
import {Card, Form, FormControl, FormGroup} from "react-bootstrap";
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
            min_yearold: "",
            zone: "",
            recieved: "",
            date: "",
            editor: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        GamesHandler.getGameFromDB(window.location.href.split('/')[4])
            .then(game => this.setState({
                _id: game._id,
                name: game.name,
                category: game.category,
                duration: game.duration,
                min_yearold: game.min_yearold,
                zone: game.zone,
                recieved: game.recieved,
                date: game.date,
                editor: "603fc7c15552f9c6ae78e660"
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
            .then(() => this.setState({redirect: true}))
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={"/jeux"}/>
        }

        return (
            <Card>
                <Form>
                    <FormGroup>
                        <Form.Label>Nom du jeu</Form.Label>
                        <FormControl
                            as={"input"} value={this.state.name} type={"text"}
                            onChange={this.handleChange} name={"name"}/>
                    </FormGroup>

                    <Button onClick={this.submit} variant={"outline-success"}>Sauvegarder</Button>
                </Form>
            </Card>
        )
    }
}

export default GameDetail

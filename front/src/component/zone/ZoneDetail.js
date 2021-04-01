import {Component} from "react"
import {Redirect} from "react-router-dom"
import {Card, Form, FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import GameTable from "../games/GameTable";
import FormContainer from "../Modal/FormContainer";

const ZonesHandler = require("./ZonesHandler")
const GameHandler = require('../games/GamesHandler')

class ZoneDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            label: "",
            sm_capacity: "",
            games: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.handleAddGame = this.handleAddGame.bind(this)
        this.handleDeleteGame = this.handleDeleteGame.bind(this)
    }

    componentDidMount() {
        ZonesHandler.getZoneFromDB(window.location.href.split('/')[5])
            .then(res => this.setState({
                _id: res._id,
                label: res.label,
                sm_capacity: res.sm_capacity,
                gamesId: res.games
            }))
            .then(() => this.state.gamesId.map(game =>
                GameHandler.getGameFromDB(game._id)
                .then(res => this.state.games.push(res))
                .then(() =>this.setState({games: this.state.games})))
            )
        GameHandler.setHandleDelete(this.handleDeleteGame)
    }

    handleAddGame(game) {
        this.state.games.push(game)
        ZonesHandler.updateZone(this.state)
            .then(() => this.setState({games: this.state.games}))
    }

    handleDeleteGame(event) {
        this.setState({
            games: this.state.games.filter(game => {
                return game._id !== event.target.name
            })
        })
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
        ZonesHandler.updateZone(this.state)
            .then(() => this.setState({redirect: "/nav/zones"}))
        // TODO update résa games: [{idRésa: ... game: }]
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <Form style={{margin: '1em'}}>
                <FormGroup>
                    <Form.Label>Nom de zones</Form.Label>
                    <FormControl
                        as={"input"} value={this.state.label} type={"text"}
                        onChange={this.handleChange} name={"label"}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Capacité</Form.Label>
                    <FormControl
                        as={"input"} value={this.state.sm_capacity} type={"text"}
                        onChange={this.handleChange} name={"sm_capacity"}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Jeux de la zone</Form.Label>
                    <Card style={{width: '4rem'}}>
                        <FormContainer
                            title={"Ajouter un jeu à la zone"}
                            component={"GameZoneForm"}
                            zone={this.state._id}
                            handleClick={this.handleAddGame}/>
                    </Card>
                    <GameTable
                        response={this.state.games}
                        zone={this.state._id}
                    />
                </FormGroup>

                <Button onClick={this.submit} variant={"outline-success"}>Sauvegarder</Button>
            </Form>
        )
    }
}

export default ZoneDetail

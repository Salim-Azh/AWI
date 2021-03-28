import {Component} from "react"
import {Redirect} from "react-router-dom"
import {Card, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import GamesBookedTable from "./gamesBooked/GamesBookedTable";
import FormContainer from "../Modal/FormContainer";

const ReservationHandler = require('./ReservationHandler')
const EditorHandler = require('../editor/EditorHandler')
const GameHandler = require("../games/GamesHandler")

class ReservationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            festival: {
                _id: "",
                premium_t_price: "",
                nb_t_premium: "",
                standard_t_price: "",
                nb_t_standard: "",
                low_t_price: "",
                nb_t_low: "",
                premium_sm_price: "",
                nb_sm_premium: "",
                standard_sm_price: "",
                nb_sm_standard: "",
                low_sm_price: "",
                nb_sm_low: ""
            },
            exhibitor: {
                _id: "",
                name: "",
                contacts: []
            },
            comment: "",
            state: "",
            need_volunteer: "",
            isEditorHere: "",
            reportSent: "",
            nb_t_premium: "",
            nb_t_standard: "",
            nb_t_low: "",
            nb_sm_premium: "",
            nb_sm_standard: "",
            nb_sm_low: "",
            games: [],
            editors: [],
            editor: {_id: "", name: ""},
            calculatedPrice: "",
            price: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.addContact =this.addContact.bind(this)
        this.removeContacts = this.removeContacts.bind(this)
        this.handleContactsChange = this.handleContactsChange.bind(this)
        this.calculatePrice = this.calculatePrice.bind(this)
        this.handleAddGame = this.handleAddGame.bind(this)
    }

    // TODO ajouter les talks

    componentDidMount() {
        ReservationHandler.getReservationFromDB(window.location.href.split('/')[5])
            .then(res => this.setState({
                _id: res.reservation._id,
                exhibitor: {
                    _id: res.exhibitor._id,
                    name: res.exhibitor.name,
                    contacts: res.exhibitor.contacts
                },
                editor: res.editor? {_id: res.editor._id, name: res.editor.name}: "",
                festival: {
                    _id: res.festival._id,
                    premium_t_price: res.festival.premium_t_price,
                    nb_t_premium: res.festival.nb_t_premium,
                    standard_t_price: res.festival.standard_t_price,
                    nb_t_standard: res.festival.nb_t_standard,
                    low_t_price: res.festival.low_t_price,
                    nb_t_low: res.festival.nb_t_low,
                    premium_sm_price: res.festival.premium_sm_price,
                    nb_sm_premium: res.festival.nb_sm_premium,
                    standard_sm_price: res.festival.standard_sm_price,
                    nb_sm_standard: res.festival.nb_sm_standard,
                    low_sm_price: res.festival.low_sm_price,
                    nb_sm_low: res.festival.nb_t_low,
                },
                comment: res.reservation.comment,
                state: res.reservation.state,
                need_volunteer: res.reservation.need_volunteer,
                isEditorHere: res.reservation.isEditorHere,
                reportSent: res.reservation.reportSent,
                nb_t_premium: res.reservation.nb_t_premium,
                nb_t_standard: res.reservation.nb_t_standard,
                nb_t_low: res.reservation.nb_t_low,
                nb_sm_premium: res.reservation.nb_sm_premium,
                nb_sm_standard: res.reservation.nb_sm_standard,
                nb_sm_low: res.reservation.nb_sm_low,
                games: res.reservation.games,
            }))
            .then(() => this.setState({calculatedPrice: this.calculatePrice()}))
/*
        EditorHandler.getEditorsFromDB()
            .then(editors => editors.map(editor => {
                if (editor && (editor.isEditor && editor.isPotential)) {
                    this.state.editors.push(editor)
                }
            }))
            .then(() => this.setState({
                editors: this.state.editors
            }))
 */
    }

    calculatePrice() {
        const nb_t_premium = this.state.nb_t_premium? this.state.nb_t_premium:0
        const nb_t_standard = this.state.nb_t_standard? this.state.nb_t_standard:0
        const nb_t_low = this.state.nb_t_low? this.state.nb_t_low:0

        const nb_sm_premium = this.state.nb_sm_premium? this.state.nb_sm_premium:0
        const nb_sm_standard = this.state.nb_sm_standard? this.state.nb_sm_standard:0
        const nb_sm_low = this.state.nb_sm_low? this.state.nb_sm_low:0

        return (
            nb_t_premium * this.state.festival.premium_t_price +
            nb_t_standard * this.state.festival.standard_t_price +
            nb_t_low * this.state.festival.low_t_price +
            nb_sm_premium * this.state.festival.premium_sm_price +
            nb_sm_standard * this.state.festival.standard_sm_price +
            nb_sm_low * this.state.festival.low_sm_price
        )
    }

    addContact() {
        this.state.exhibitor.contacts.push("")
        this.setState({exhibitor: this.state.exhibitor})
    }

    removeContacts() {
        this.state.exhibitor.contacts.pop()
        this.setState({exhibitor: this.state.exhibitor})
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
        this.setState({
            calculatedPrice: this.calculatePrice()
        })
    }

    handleContactsChange(event) {
        const target = event.target
        const value = target.value
        const index = target.name;

        let contacts = this.state.exhibitor.contacts
        contacts[index] = value

        this.setState({exhibitor: {contacts: contacts}})
    }

    handleAddGame(game) {
        GameHandler.addGames(game)
            .then(response => response.json())
            .then(response => game._id = response.gameId)
            .then(() => this.state.games.push(game))
            .then(() => this.setState({games: this.state.games}))
    }

    submit() {
        this.state.editors = undefined
        ReservationHandler.updateReservation(this.state)
            .then()
        EditorHandler.updateEditor(this.state.exhibitor)
            .then(() => this.setState({redirect: "/nav/reservations"}))
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        const options = [
            "En discussion",
            "Pas de réponse",
            "Considéré absent",
            "Annulé",
            "Confirmé",
            "Liste jeux demandé",
            "Liste jeux confirmé"
        ]

        const optionsState = options.map(option =>
            <option value={option}>{option}</option>
        )

        const contacts = this.state.exhibitor.contacts.map((contact, index) => {
            return (
                <>
                    <FormControl
                        as={"input"} type={"text"} value={contact} key={index}
                        onChange={this.handleContactsChange} name={index}/>
                </>
            )
        })

        const editorsState = this.state.editors.map(editor => {
            return (
                <option value={editor}>{editor}</option>
            )
        })
        // TODO liste déroulante pour contact

        return (
            <Form style={{margin: '2em'}}>
                <Row className="justify-content-md-center">
                    <Col lg md xs>
                        <Card bg={"info"}>
                            <Card.Header>
                                <Card.Title>Exposant : {this.state.exhibitor.name}</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Col>
                                    <FormGroup>
                                        <Form.Label>Contact</Form.Label>
                                        {contacts}
                                    </FormGroup>
                                </Col>
                                <Button variant={"warning"} onClick={this.addContact}>Ajouter contact</Button>
                                <Button variant={"warning"} onClick={this.removeContacts}>Enlever contact</Button>
                            </Card.Body>
                        </Card>
                    </Col>


                    <Col>
                        <Card bg={"secondary"}>
                            <Card.Header>
                                <Card.Title>Statut de la réservation</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Col>
                                    <FormGroup>
                                        <Form.Label>état</Form.Label>
                                        <FormControl
                                            as={"select"} value={this.state.state}
                                            onChange={this.handleChange} name={"state"}>
                                            {optionsState}
                                        </FormControl>
                                    </FormGroup>
                                </Col>

                                <Col>
                                    <FormGroup>
                                        <Form.Label>Commentaire</Form.Label>
                                        <FormControl
                                            as={"textarea"} value={this.state.comment}
                                            onChange={this.handleChange} name={"comment"}
                                            rows={4}/>
                                    </FormGroup>
                                </Col>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row
                    style={{marginTop: '2em'}}
                >

                    <Col lg={9} md={9} xs={9}>
                        <Card
                            bg={"dark"}
                            text={"white"}
                        >
                            <Card.Header>
                                <Card.Title>Tables/m² réservés</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Row style={{margin: "1em"}}>
                                    <Col>
                                        <FormGroup>
                                            <Form.Label>Nombre de tables premium réservé</Form.Label>
                                            <FormControl
                                                as={"input"} value={this.state.nb_t_premium} id={"1"}
                                                max={this.state.festival.nb_t_premium}
                                                name={"nb_t_premium"} onChange={this.handleChange}/>
                                        </FormGroup>
                                    </Col>


                                    <Col>
                                        <FormGroup>
                                            <Form.Label>Nombre de tables standard réservé</Form.Label>
                                            <FormControl
                                                as={"input"} value={this.state.nb_t_standard} id={"1"}
                                                max={this.state.festival.nb_t_standard}
                                                name={"nb_t_standard"} onChange={this.handleChange}/>
                                        </FormGroup>
                                    </Col>


                                    <Col>
                                        <FormGroup>
                                            <Form.Label>Nombre de tables low réservé</Form.Label>
                                            <FormControl
                                                as={"input"} value={this.state.nb_t_low} id={"1"}
                                                max={this.state.festival.nb_t_low}
                                                name={"nb_t_low"} onChange={this.handleChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row style={{margin: "1em"}}>
                                    <Col>
                                        <FormGroup>
                                            <Form.Label>Nombre de m² premium réservé</Form.Label>
                                            <FormControl
                                                as={"input"} value={this.state.nb_sm_premium} id={"1"}
                                                max={this.state.festival.nb_sm_premium}
                                                name={"nb_sm_premium"} onChange={this.handleChange}/>
                                        </FormGroup>
                                    </Col>


                                    <Col>
                                        <FormGroup>
                                            <Form.Label>Nombre de m² standards réservé</Form.Label>
                                            <FormControl
                                                as={"input"} value={this.state.nb_sm_standard} id={"1"}
                                                max={this.state.festival.nb_sm_standard}
                                                name={"nb_sm_standard"} onChange={this.handleChange}/>
                                        </FormGroup>
                                    </Col>


                                    <Col>
                                        <FormGroup>
                                            <Form.Label>Nombre de m² low réservé</Form.Label>
                                            <FormControl
                                                as={"input"} value={this.state.nb_sm_low} id={"1"}
                                                max={this.state.festival.nb_sm_low}
                                                name={"nb_sm_low"} onChange={this.handleChangePrice}/>
                                        </FormGroup>
                                    </Col>
                                </Row>


                                <Row style={{margin: "1em"}}>
                                    <Col>
                                        <FormGroup>
                                            <Form.Label>Prix calculé</Form.Label>
                                            <FormControl
                                                as={"input"} value={this.state.calculatedPrice}
                                                readOnly/>
                                        </FormGroup>
                                    </Col>


                                    <Col>
                                        <FormGroup>
                                            <Form.Label>Prix négocié</Form.Label>
                                            <FormControl
                                                as={"input"} value={this.state.price}
                                                min={this.state.calculatedPrice} type={"number"}
                                                name={"price"} onChange={this.handleChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={"auto"} md={"auto"} xs={"auto"}>
                        <Card bg={"light"}>
                            <Card.Header>
                                <Card.Title>Spécifité</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <FormGroup>
                                    <Form.Label>Besoin de bénévoles ?</Form.Label>
                                    <Form.Check
                                        checked={this.state.need_volunteer}
                                        onChange={this.handleChange} name={"need_volunteer"}/>
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Editeur présent ?</Form.Label>
                                    <Form.Check
                                        checked={this.state.isEditorHere}
                                        onChange={this.handleChange} name={"isEditorHere"}/>
                                </FormGroup>

                                <FormGroup>
                                    <Form.Label>Compte rendu envoyé ?</Form.Label>
                                    <Form.Check
                                        checked={this.state.reportSent}
                                        onChange={this.handleChange} name={"reportSent"}/>
                                </FormGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row
                    style={{marginTop: "2em"}}
                >
                    <Col lg={6} md={8} xs={9}>
                        <Card
                            bg={"light"}
                        >

                            <Card.Header>
                                <Card.Title>Jeux de l'éditeur {this.state.editor.name}</Card.Title>
                                <Card style={{width: '4rem'}}>
                                <FormContainer
                                    title={"Ajouter un jeu à l'editeur"}
                                    editorId={this.state.editor._id}
                                    editorName={this.state.editor.name}
                                    component={"GameForm"}
                                    handleClick={this.handleAddGame}
                                />
                                </Card>
                            </Card.Header>

                            <Card.Body>
                                <GamesBookedTable games={this.state.games}/>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card bg={"info"}>
                            <Card.Header>
                                <Card.Title>Changer d'éditeur :</Card.Title>
                            </Card.Header>

                            <Card.Body>
                                <FormControl
                                    as={"select"} value={this.state.editor}
                                    onChange={this.handleChange} name={"editor"}>
                                    {editorsState}
                                </FormControl>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Button
                    style={{marginTop: "1em"}}
                    variant={"outline-success"}
                    onClick={this.submit}>Sauvegarder</Button>
            </Form>
        )
    }
}

export default ReservationDetail

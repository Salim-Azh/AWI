import {Component} from "react"
import {Redirect} from "react-router-dom"
import {Card, Col, Form, FormControl, FormGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
const ReservationHandler = require('./ReservationHandler')
const EditorHandler = require('../editor/EditorHandler')

class ReservationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            exhibitor: {
                _id: "",
                name: "",
                contacts: ["", ""]
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
            calculatedPrice: "",
            price: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.addContact =this.addContact.bind(this)
        this.removeContacts = this.removeContacts.bind(this)
        this.handleContactsChange = this.handleContactsChange.bind(this)
    }

    componentDidMount() {
        /*
        ReservationHandler.getReservationFromDB(window.location.href.split('/')[5])
            .then(res => this.setState({
                _id: res.reservation._id,
                exhibitor: {_id: res.exhibitor._id, name: res.exhibitor.name},
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
            }))
         */
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
    }

    handleContactsChange(event) {
        const target = event.target
        const value = target.value
        const index = target.name;

        let contacts = this.state.exhibitor.contacts
        contacts[index] = value

        this.setState({exhibitor: {contacts: contacts}})
    }

    submit() {
        ReservationHandler.updateReservation(this.state)
            .then()
        EditorHandler.updateEditor(this.state.exhibitor)
            .then()
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

        return (
            <Form style={{margin: '2em'}}>
                <Row className="justify-content-md-center">
                    <Col lg md xs>
                        <Card bg={"info"}>
                            <Card.Header>
                                <Card.Title>Editeur</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Col>
                                    <FormGroup>
                                        <Form.Label>Nom</Form.Label>
                                        <FormControl
                                            as={"input"} value={this.state.exhibitor.name} type={"text"}
                                            onChange={this.handleChange} name={"name"}/>
                                    </FormGroup>
                                </Col>

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
                                            as={"input"} value={this.state.comment} type={"text"}
                                            onChange={this.handleChange} name={"comment"}/>
                                    </FormGroup>
                                </Col>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row
                    style={{marginTop: '1em'}}
                    className={"justify-content-md-center"}
                >
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
                </Row>

                <Card
                    bg={"success"}
                    style={{marginTop: "2em"}}
                >

                    <Card.Header>
                        <Card.Title>Jeux réservés</Card.Title>
                    </Card.Header>

                    <Card.Body>

                    </Card.Body>

                </Card>

                <Card
                    bg={"dark"}
                    style={{marginTop: "2em"}}
                    text={"white"}
                >
                    <Card.Header>
                        <Card.Title>Facture</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Row style={{margin: "1em"}}>
                            <Col>
                                <FormGroup>
                                    <Form.Label>Nombre de tables premium réservé</Form.Label>
                                    <FormControl
                                        as={"input"} value={this.state.nb_t_premium}
                                        name={"nb_t_premium"} onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>


                            <Col>
                                <FormGroup>
                                    <Form.Label>Nombre de tables standard réservé</Form.Label>
                                    <FormControl
                                        as={"input"} value={this.state.nb_t_standard}
                                        name={"nb_t_standard"} onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>


                            <Col>
                                <FormGroup>
                                    <Form.Label>Nombre de tables low réservé</Form.Label>
                                    <FormControl
                                        as={"input"} value={this.state.nb_t_low}
                                        name={"nb_t_low"} onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row style={{margin: "1em"}}>
                            <Col>
                                <FormGroup>
                                    <Form.Label>Nombre de m² premium réservé</Form.Label>
                                    <FormControl
                                        as={"input"} value={this.state.nb_sm_premium}
                                        name={"nb_sm_premium"} onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>


                            <Col>
                                <FormGroup>
                                    <Form.Label>Nombre de m² standards réservé</Form.Label>
                                    <FormControl
                                        as={"input"} value={this.state.nb_sm_standard}
                                        name={"nb_sm_standard"} onChange={this.handleChange}/>
                                </FormGroup>
                            </Col>


                            <Col>
                                <FormGroup>
                                    <Form.Label>Nombre de m² low réservé</Form.Label>
                                    <FormControl
                                        as={"input"} value={this.state.nb_sm_low}
                                        name={"nb_sm_low"} onChange={this.handleChange}/>
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

                <Button
                    style={{marginTop: "1em"}}
                    variant={"outline-success"}
                    onClick={this.submit}>Sauvegarder</Button>
            </Form>
        )
    }
}

export default ReservationDetail

/*

 */

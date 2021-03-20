import {Component} from "react"
import Button from "react-bootstrap/Button"
import {Form, FormControl, FormGroup} from "react-bootstrap";

class ReservationForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            contact: ""
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    formIsUnchanged() {
        return (
            this.state.name === ""
        )
    }

    submit() {
        // TODO faire un retour utilisateur
        if (this.formIsUnchanged()) {
            return
        }
        this.props.handleClick(this.state)
        this.setState({
            name: "",
            contact: ""
        })
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Form.Label>Nom</Form.Label>
                    <FormControl as={"input"} name="name" type="text" value={this.state.name} placeholder="Nom"
                           onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Contacts</Form.Label>
                    <FormControl as={"input"} name="contact" type="text" value={this.state.contact} placeholder="Contact"
                           onChange={this.handleChange}/>
                </FormGroup>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </Form>
        )
    }
}

export default ReservationForm

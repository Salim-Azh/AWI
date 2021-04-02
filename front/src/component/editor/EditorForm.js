import {Component} from "react"
import Button from "react-bootstrap/Button"
import {Form, FormControl, FormGroup} from "react-bootstrap";

class EditorForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            contacts: [],
            isEditor: false,
            isExhibitor: false,
            isPotential: true
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleContactsChange = this.handleContactsChange.bind(this)
        this.addContact = this.addContact.bind(this)
        this.removeContacts = this.removeContacts.bind(this)
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

    addContact() {
        this.state.contacts.push("")
        this.setState({contacts: this.state.contacts})
    }

    removeContacts() {
        this.state.contacts.pop()
        this.setState({contacts: this.state.contacts})
    }

    formIsUnchanged() {
        return (
            this.state.name === "" ||
            this.state.contacts === ""
        )
    }

    submit() {
        if (this.formIsUnchanged()) {
            return
        }
        this.props.handleClick(this.state)
        this.setState({
            name: "",
            contact: "",
            isEditor: "",
            isExhibitor: "",
            isPotential: true
        })
    }

    render() {
        const rows = this.state.contacts.map((contact, index) => {
            return (
                <>
                    <FormControl
                        as={"input"} type={"text"} value={contact} key={index}
                        onChange={this.handleContactsChange} name={index}/>
                </>
            )
        })

        return (
            <Form>
                <FormGroup>
                    <Form.Label>Nom</Form.Label>
                    <FormControl as={"input"} name="name" type="text" value={this.state.name} placeholder="Nom"
                           onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Contacts</Form.Label>
                    <Button variant={"warning"} onClick={this.addContact}>Ajouter contact</Button>
                    <Button variant={"warning"} onClick={this.removeContacts}>Enlever contact</Button>
                    {rows}
                </FormGroup>

                <FormGroup>
                    <Form.Check label={"Editeur ?"}
                                checked={this.state.isEditor}
                                onChange={this.handleChange}
                                name="isEditor"
                    />
                    <Form.Check label={"Exposant ?"}
                                checked={this.state.isExhibitor}
                                onChange={this.handleChange}
                                name="isExhibitor"
                    />
                </FormGroup>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </Form>
        )
    }
}

export default EditorForm

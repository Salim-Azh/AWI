import {Component} from "react"
import Button from "react-bootstrap/Button"
import {Form, FormControl, FormGroup} from "react-bootstrap";

class EditorForm extends Component {

    constructor(props) {
        super(props)

        if(props.editor) {

        }
        this.state = {
            name: "",
            contacts: {
                email: "",
                phone_number: ""
            },
            isEditor: false,
            isExhibitor: false,
            isPotential: true
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
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
        return (
            <Form>
                <FormGroup>
                    <Form.Label>Nom</Form.Label>
                    <FormControl as={"input"} name="name" type="text" value={this.state.name} placeholder="Nom"
                           onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Contacts</Form.Label>
                    <FormControl as={"input"} name="contacts.email" type="text" value={this.state.contacts.email}
                                 placeholder="Contact"
                                 onChange={this.handleChange}/>
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

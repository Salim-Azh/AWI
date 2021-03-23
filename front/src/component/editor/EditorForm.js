import {Component} from "react"
import Button from "react-bootstrap/Button"
import {Form, FormControl, FormGroup} from "react-bootstrap";

class EditorForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            contacts: "",
            isEditor: false,
            isExhibitor: false,
            isPotential: true
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEditorCheckChange = this.handleEditorCheckChange.bind(this)
        this.handleExhibitorCheckChange = this.handleExhibitorCheckChange.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleEditorCheckChange(event) {
        const target = event.target;
        const checked = target.checked;
        this.setState({isEditor: checked})
    }

    handleExhibitorCheckChange(event) {
        const target = event.target;
        const checked = target.checked;
        this.setState({isExhibitor: checked})
    }

    formIsUnchanged() {
        return (
            this.state.name === "" ||
                this.state.contacts === ""
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
            contact: [""],
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
                    <FormControl as={"input"} name="contacts" type="text" value={this.state.contacts} placeholder="Contact"
                           onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Check label={"Editeur ?"}
                                checked={this.state.isEditor}
                                onChange={this.handleEditorCheckChange}
                                name="isEditor"
                    />
                    <Form.Check label={"Exposant ?"}
                                checked={this.state.isExhibitor}
                                onChange={this.handleExhibitorCheckChange}
                                name="isExhibitor"
                    />
                </FormGroup>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </Form>
        )
    }
}

export default EditorForm

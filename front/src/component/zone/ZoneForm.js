import {Component} from "react"
import {Form, FormControl, Button, FormGroup} from "react-bootstrap";

class ZoneForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            capacity: ""
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleEditorChange(event) {
        const target = event.target;
        const value = target.value;

        this.state.editor = {
            _id: value.split(',')[0],
            name: value.split(',')[1]
        }
        this.setState({
            editor: this.state.editor
        })
    }

    formIsUnchanged() {
        return (
            this.state.name === "" ||
            this.state.capacity === ""
        )
    }

    submit() {
        if (this.formIsUnchanged()) {
            return
        }
        this.props.handleClick(this.state)
        this.setState({
            name: "",
            capacity: ""
        })
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Form.Label>Nom de zone</Form.Label>
                    <FormControl as={"input"} onChange={this.handleEditorChange}>
                        <FormControl as={"input"} name="name" type="text" value={this.state.name} placeholder="Nom de la zone"
                                     onChange={this.handleChange}/>
                    </FormControl>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Capacité</Form.Label>
                    <FormControl as={"input"} name="capacity" type="number" value={this.state.capacity} placeholder="Capacité"
                                 onChange={this.handleChange}/>
                </FormGroup>

                <Button onClick={this.submit} variant={"link"}>Ajouter à l'éditeur</Button>
            </Form>
        )
    }
}

export default ZoneForm

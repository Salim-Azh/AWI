import {Component} from "react"
import {Form, FormControl, Button, FormGroup} from "react-bootstrap";

class ZoneForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            label: "",
            sm_capacity: ""
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
            this.state.label === "" ||
            this.state.capacity === ""
        )
    }

    submit() {
        if (this.formIsUnchanged()) {
            return
        }
        this.props.handleClick(this.state)
        this.setState({
            label: "",
            sm_capacity: ""
        })
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Form.Label>Nom de zone</Form.Label>
                    <FormControl as={"input"} name="label" type="text" value={this.state.label} placeholder="Nom de la zone"
                                 onChange={this.handleChange}/>

                </FormGroup>

                <FormGroup>
                    <Form.Label>Capacité</Form.Label>
                    <FormControl as={"input"} name="sm_capacity" type="number" value={this.state.sm_capacity} placeholder="Capacité"
                                 onChange={this.handleChange}/>
                </FormGroup>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </Form>
        )
    }
}

export default ZoneForm

import {Component} from "react"
import Button from "react-bootstrap/Button"
import {Form, FormControl, FormGroup} from "react-bootstrap";

const ExhibitorHandler = require("../editor/exhibitor/ExhibitorHandler")

class ReservationForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            festival: "",
            exhibitor: {_id: "", name: ""}
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleExhibitorChange = this.handleExhibitorChange.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleExhibitorChange(event) {
        const target = event.target;
        const value = target.value;

        this.state.exhibitor = {
            _id: value.split(',')[0],
            name: value.split(',')[1]
        }
        this.setState({
            exhibitor: this.state.exhibitor
        })
    }

    formIsUnchanged() {
        return (
            this.state.festival === "" ||
            this.state.exhibitor._id === "" ||
            this.state.exhibitor.name === ""
        )
    }

    submit() {
        // TODO faire un retour utilisateur
        if (this.formIsUnchanged()) {
            return
        }
        this.props.handleClick(this.state)
        this.setState({
            festival: "",
            exhibitor: {_id: "", name: ""}
        })
    }

    render() {
        const rows = this.props.exhibitors.map(exhibitor =>
            <option key={exhibitor._id} value={exhibitor._id + "," + exhibitor.name}>{exhibitor.name}</option>
        )

        return (
            <Form>
                <FormGroup>
                    <Form.Label>Exposant</Form.Label>
                    <FormControl as={"select"} name="exhibitor" onChange={this.handleEditorChange}>
                        <option value={""}>---</option>
                        {rows}
                    </FormControl>
                </FormGroup>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </Form>
        )
    }
}

export default ReservationForm

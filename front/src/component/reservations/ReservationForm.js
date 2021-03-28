import {Component} from "react"
import Button from "react-bootstrap/Button"
import {Form, FormControl, FormGroup} from "react-bootstrap";

const ExhibitorHandler = require("../editor/exhibitor/ExhibitorHandler")

class ReservationForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            exhibitor: {_id: "", name: ""}
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleExhibitorChange = this.handleExhibitorChange.bind(this)
    }

    componentDidMount() {
        ExhibitorHandler.getExhibitorsFromDB()
            .then(exhibitors => exhibitors.map(exhibitor => {
            if (exhibitor && (exhibitor.isPotential)) {
                this.state.exhibitors.push(exhibitor)
            }
            }))
            .then(() => this.setState({
                exhibitors: this.state.exhibitors
            }))
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
            this.state.exhibitor._id === "" ||
            this.state.exhibitor.name === ""
        )
    }

    submit() {
        if (this.formIsUnchanged()) {
            return
        }
        this.state.exhibitors = undefined
        this.props.handleClick(this.state)
    }

    render() {
        const rows = this.props.exhibitors.map(exhibitor =>
            <option key={exhibitor._id} value={exhibitor._id + "," + exhibitor.name}>{exhibitor.name}</option>
        )

        return (
            <Form>
                <FormGroup>
                    <Form.Label>Exposant</Form.Label>
                    <FormControl as={"select"} name="exhibitor" onChange={this.handleExhibitorChange}>
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

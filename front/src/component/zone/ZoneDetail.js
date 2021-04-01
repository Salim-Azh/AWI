import {Component} from "react"
import {Redirect} from "react-router-dom"
import {Form, FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ZonesHandler = require("./ZonesHandler")

class ZoneDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            name: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
    }

    componentDidMount() {
        ZonesHandler.getZonesFromDB(window.location.href.split('/')[5])
            .then(res => this.setState({
                _id: res._id,
                name: res.name
            }))
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    submit() {
        ZonesHandler.updateZone(this.state)
            .then(() => this.setState({redirect: "/nav/zones"}))
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }

        return (
            <Form style={{margin: '1em'}}>
                <FormGroup>
                    <Form.Label>Nom de zones</Form.Label>
                    <FormControl
                        as={"input"} value={this.state.name} type={"text"}
                        onChange={this.handleChange} name={"name"}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Jeux de la zone</Form.Label>
                </FormGroup>

                <Button onClick={this.submit} variant={"outline-success"}>Sauvegarder</Button>
            </Form>
        )
    }
}

export default ZoneDetail

import {Component} from "react"
import {Form, FormControl, Button, FormGroup} from "react-bootstrap";

class GameForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            min_yearold: "",
            category: "",
            duration: "",
            editor: "",
            zone: "",
            countPlayer: "",
            prototype: "",
            placed: "",
            recieved: "",
            need_volunteer: "",
            date: ""
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
            this.state.name === "" ||
            this.state.min_yearold === "" ||
            this.state.category === "" ||
            this.state.duration === ""
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
            min_yearold: "",
            category: "",
            duration: "",
            editor: "",
            zone: "",
            countPlayer: "",
            prototype: "",
            placed: "",
            recieved: "",
            need_volunteer: "",
            date: ""
        })
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Form.Label>Nom</Form.Label>
                    <FormControl as={"input"} name="name" type="text" value={this.state.name} placeholder="Nom du jeu"
                                 onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Âge requis</Form.Label>
                    <FormControl as={"input"} name="min_yearold" type="number" value={this.state.min_yearold} placeholder="Âge minimum"
                                 onChange={this.handleChange} min={0}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Catégorie</Form.Label>
                    <FormControl as={"select"} name="category" onChange={this.handleChange}>
                        <option value="">---</option>
                        <option value="enfant">enfant</option>
                        <option value="ambiance">ambiance</option>
                        <option value="famille">famille</option>
                    </FormControl>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Durée de partie</Form.Label>
                    <FormControl as={"input"} name="duration" type="number" value={this.state.duration} placeholder="Durée"
                                 onChange={this.handleChange} min={0}/>
                </FormGroup>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </Form>
        )
    }
}

export default GameForm

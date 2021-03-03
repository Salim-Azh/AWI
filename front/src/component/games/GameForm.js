import {Component} from "react";

import Button from "react-bootstrap/Button"

class GameForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            min_yearold: "",
            category: "",
            duration: "",
            editor: ""
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

    submit() {
        this.props.handleClick(this.state)
        this.setState({
            name: "",
            min_yearold: "",
            category: "",
            duration: "",
            editor: ""
        })
    }

    render() {
        return (
            <form>
                <input name="name" type="text" value={this.state.name} placeholder="Nom du jeu"
                       onChange={this.handleChange}/>
                <input name="min_yearold" type="number" value={this.state.min_yearold} placeholder="Âge minimum"
                       onChange={this.handleChange}/>
                <input name="category" type="text" value={this.state.category} placeholder="Catégorie"
                       onChange={this.handleChange}/>
                <input name="duration" type="number" value={this.state.duration} placeholder="Durée"
                       onChange={this.handleChange}/>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </form>
        )
    }
}

export default GameForm
import {Component} from "react"
import Button from "react-bootstrap/Button"

class EditorForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            contact: ""
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
            this.state.name === ""
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
            contact: ""
        })
    }

    render() {
        return (
            <form>
                <input name="name" type="text" value={this.state.name} placeholder="Nom"
                       onChange={this.handleChange}/>
                <input name="contact" type="text" value={this.state.contact} placeholder="Contact"
                        onChange={this.handleChange}/>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </form>
        )
    }
}

export default EditorForm

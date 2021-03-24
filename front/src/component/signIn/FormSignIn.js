import {Component} from "react"
import {Form, FormControl, Button, FormLabel} from "react-bootstrap";

class FormSignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })

        console.log(name, value)
    }

    handleSubmit() {
        // Todo add user to db
        this.setState({
            email: "",
            password: ""
        })
    }

    render() {
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <FormLabel>Email</FormLabel>
                <FormControl
                    type={"text"}
                    value={this.state.email}
                    name={"email"}
                    placeholder={"prenom.nom@jeux.com"}
                    onChange={this.handleChange}
                />

                <FormLabel>Mot de passe</FormLabel>
                <FormControl
                    type={"password"}
                    value={this.state.password}
                    name={"password"}
                    placeholder={"Mot de passe"}
                    onChange={this.handleChange}
                />

                <Button type={"submit"} onClick={this.submit}>Connexion</Button>
            </Form>
        )
    }
}

export default FormSignIn
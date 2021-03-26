import {Component} from "react"
import {Form, FormControl, Button, FormLabel} from "react-bootstrap";
const urlApi = require('../../public/urlApi')

class FormSignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            pwd: "",
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
    }

    formIsUnchanged() {
        return (
            this.state.email === "" ||
            this.state.pwd === ""
        )
    }

    handleSubmit() {
        if (this.formIsUnchanged()) {
            return
        }
        const params = {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(this.state)
        }
        fetch(urlApi.login, params)
            .then(res => res.json())
            .then((res) => {
                console.log(res.token)
                let d = new Date()
                d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
                document.cookie = "token" + "=" + res.token + ";" + "expires" + "=" + d.toUTCString()// + ";" + "Secure; HttpOnly"
            })
            .catch(e => {
                console.log(e.stack)
                console.log(e.message)
            })
        this.setState({
            email: "",
            pwd: ""
        })
    }

    render() {
        return (
            <Form style={{margin: '1em'}}>
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
                    value={this.state.pwd}
                    name={"pwd"}
                    placeholder={"Mot de passe"}
                    onChange={this.handleChange}
                />
                <Button onClick={this.handleSubmit}> Connexion</Button>
            </Form>
        )
    }
}

export default FormSignIn

import {Component} from "react"
import {Form, FormControl, Button, FormLabel} from "react-bootstrap";
import Cookies from 'js-cookie'
const urlApi = require('../../public/urlApi')

class FormSignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            pwd: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)

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

    submit() {
        // Todo add user to db
        if (this.formIsUnchanged()) {
            return
        }
        const params = {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify(this.state)
        }
        fetch(urlApi.login, params)
            .then(res => res.headers)
            .then((res) => {
                console.log(Cookies.get())
                return res
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
                    value={this.state.pwd}
                    name={"pwd"}
                    placeholder={"Mot de passe"}
                    onChange={this.handleChange}
                />
                <Button onClick={this.submit}> Connexion</Button>
            </Form>
        )
    }
}

export default FormSignIn
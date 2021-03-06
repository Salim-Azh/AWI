import {Component} from "react"
import {Form, FormControl, Button, FormLabel} from "react-bootstrap";

class FormSignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            password: "",
            address: ""
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
            name: "",
            password: "",
            address: ""
        })
    }

    render() {
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                    <FormLabel>Nom de l'entreprise</FormLabel>
                    <FormControl
                        type={"text"}
                        value={this.state.name}
                        name={"name"}
                        placeholder={"Nom"}
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


                    <FormLabel>Addresse</FormLabel>
                    <FormControl
                        type={"text"}
                        value={this.state.address}
                        name={"address"}
                        placeholder={"Adresse"}
                        onChange={this.handleChange}
                    />

                <Button type={"submit"}>Valider</Button>
            </Form>
        )
    }
}

export default FormSignIn

/*
import { Field, reduxForm } from 'redux-form'

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Le nom est requis'
    }

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.address) {
        errors.age = "L'adresse est requise"
    }

    return errors
}

const warn = values => {
    const warnings = {}
    if (values.age < 19) {
        warnings.age = 'Hmm, you seem a bit young...'
    }
    return warnings
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const FormSignIn = (props) => {
    const { handleSubmit, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <Field name="name" type="text" component={renderField} label="Nom"/>
            <Field name="password" type="email" component={renderField} label="Mot de passe"/>
            <Field name="address" type="type" component={renderField} label="Adresse"/>
            <div>
                <button type="submit" disabled={submitting}>Valider</button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'syncValidation',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
    warn                     // <--- warning function given to redux-form
})(FormSignIn)
*/

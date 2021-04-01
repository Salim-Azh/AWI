import {Component} from "react"
import Button from "react-bootstrap/Button"
import {Form, FormControl, FormGroup} from "react-bootstrap";

class FestivalForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            year: "",
            nb_t_premium: "",
            nb_t_standard: "",
            nb_t_low: "",
            nb_sm_premium: "",
            nb_sm_standard: "",
            nb_sm_low: "",
            premium_t_price: "",
            standard_t_price: "",
            low_t_price: "",
            premium_sm_price: "",
            standard_sm_price: "",
            low_sm_price: "",
            isCurrent: ""
        }

        this.submit = this.submit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    formIsUnchanged() {
        return (
            this.state.name === "" ||
            this.state.nb_t_premium ===  "" ||
            this.state.nb_t_standard === "" ||
            this.state.nb_t_low === "" ||
            this.state.nb_sm_premium === "" ||
            this.state.nb_sm_standard === "" ||
            this.state.nb_sm_low === "" ||
            this.state.year === "" ||
            this.state.premium_t_price === "" ||
            this.state.standard_t_price === "" ||
            this.state.low_t_price === "" ||
            this.state.premium_sm_price === "" ||
            this.state.standard_sm_price === "" ||
            this.state.low_sm_price === ""
        )
    }

    submit() {
        if (this.formIsUnchanged()) {
            return
        }
        this.props.handleClick(this.state)
        this.setState({
            name: "",
            year: "",
            nb_t_premium: "",
            nb_t_standard: "",
            nb_t_low: "",
            nb_sm_premium: "",
            nb_sm_standard: "",
            nb_sm_low: "",
            premium_t_price: "",
            standard_t_price: "",
            low_t_price: "",
            premium_sm_price: "",
            standard_sm_price: "",
            low_sm_price: "",
            isCurrent: "",
            nb_rt_premium: 0,
            nb_rt_standard: 0,
            nb_rt_low: 0,
            nb_rsm_premium: 0,
            nb_rsm_standard: 0,
            nb_rsm_low: 0
        })
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Form.Label>Nom du festival</Form.Label>
                    <FormControl as={"input"} name="name" type="text" value={this.state.name} placeholder="Nom"
                           onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Année du festival</Form.Label>
                    <FormControl as={"input"} name="year" type="number" min={0} value={this.state.year} placeholder="Année"
                                 onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Nombre de tables</Form.Label>
                    <FormControl as={"input"} name="nb_t_premium" type="number" min={0} value={this.state.nb_t_premium}
                                 placeholder="premium" onChange={this.handleChange}/>

                    <FormControl as={"input"} name="nb_t_standard" type="number" min={0} value={this.state.nb_t_standard}
                                 placeholder="standard" onChange={this.handleChange}/>

                    <FormControl as={"input"} name="nb_t_low" type="number" min={0} value={this.state.nb_t_low}
                                 placeholder="low" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>Nombre de m²</Form.Label>
                    <FormControl as={"input"} name="nb_sm_premium" type="number" min={0} value={this.state.nb_sm_premium}
                                 placeholder="premium" onChange={this.handleChange}/>

                    <FormControl as={"input"} name="nb_sm_standard" type="number" min={0} value={this.state.nb_sm_standard}
                                 placeholder="standard" onChange={this.handleChange}/>

                    <FormControl as={"input"} name="nb_sm_low" type="number" min={0} value={this.state.nb_sm_low}
                                 placeholder="low" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>prix des tables</Form.Label>
                    <FormControl as={"input"} name="premium_t_price" type="number" min={0} value={this.state.premium_t_price}
                                 placeholder="premium" onChange={this.handleChange}/>

                    <FormControl as={"input"} name="standard_t_price" type="number" min={0} value={this.state.standard_t_price}
                                 placeholder="standard" onChange={this.handleChange}/>

                    <FormControl as={"input"} name="low_t_price" type="number" min={0} value={this.state.low_t_price}
                                 placeholder="low" onChange={this.handleChange}/>
                </FormGroup>

                <FormGroup>
                    <Form.Label>prix des m²</Form.Label>
                    <FormControl as={"input"} name="premium_sm_price" type="number" min={0} value={this.state.premium_sm_price}
                                 placeholder="premium" onChange={this.handleChange}/>

                    <FormControl as={"input"} name="standard_sm_price" type="number" min={0} value={this.state.standard_sm_price}
                                 placeholder="standard" onChange={this.handleChange}/>

                    <FormControl as={"input"} name="low_sm_price" type="number" min={0} value={this.state.low_sm_price}
                                 placeholder="low" onChange={this.handleChange}/>
                </FormGroup>

                <Form.Check label={"Festival courant ?"} name={"isCurrent"} checked={this.state.isCurrent}
                onChange={this.handleChange}/>

                <Button onClick={this.submit} variant={"link"}>Ajouter</Button>
            </Form>
        )
    }
}

export default FestivalForm

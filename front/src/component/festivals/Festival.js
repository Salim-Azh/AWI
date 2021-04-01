import {Component} from "react"
import {Card, FormControl, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Festival extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: props.festival._id,
            nb_t_premium: props.festival.nb_t_premium,
            nb_t_standard: props.festival.nb_t_standard,
            nb_t_low: props.festival.nb_t_low,
            nb_sm_premium: props.festival.nb_sm_premium,
            nb_sm_standard: props.festival.nb_sm_standard,
            nb_sm_low: props.festival.nb_sm_low,
            premium_t_price: props.festival.premium_t_price,
            standard_t_price: props.festival.standard_t_price,
            low_t_price: props.festival.low_t_price,
            premium_sm_price: props.festival.premium_sm_price,
            standard_sm_price: props.festival.standard_sm_price,
            low_sm_price: props.festival.low_sm_price,
            is_current: props.festival.is_current,
            premium_remaining_t: "",
            standard_remaining_t: "",
            low_remaining_t: "",
            premium_remaining_sm: "",
            standard_remaining_sm: "",
            low_remaining_sm: "",

        }

        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.setCurrent = this.setCurrent.bind(this)
    }

    handleChange(event) {
        const target = event.target
        const name = target.name
        const value = target.value

        this.setState({
            [name]: value
        })

        if(name === "") {
            this.setCurrent()
        }
    }

    submit() {
        this.props.handleUpdate(this.state)
    }

    setCurrent() {
        this.props.handleUpdateCurrent({
            _id: this.state._id,
            is_current: true
        })
        this.setState({is_current: true})
    }

    render() {
        return (
            <>
                <Card.Body>
                    <Card.Header>
                        <Card.Title>{this.props.festival.name} - {this.props.festival.year}</Card.Title>
                    </Card.Header>
                    <Card.Text>
                        <Table>
                            <thead>
                            <tr>
                                <th/>
                                <th>Tables</th>
                                <th>prix/table</th>
                                <th>restant</th>
                                <th>m²</th>
                                <th>prix/m²</th>
                                <th>restant</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>Premium</td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_t_premium}
                                                 onChange={this.handleChange} name={"nb_t_premium"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.premium_t_price}
                                                 onChange={this.handleChange} name={"premium_t_price"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.premium_remaining_t}
                                                 readOnly/>
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_sm_premium}
                                                 onChange={this.handleChange} name={"nb_sm_premium"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.premium_sm_price}
                                                 onChange={this.handleChange} name={"premium_sm_price"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.premium_remaining_sm}
                                                 readOnly/>
                                </td>
                            </tr>

                            <tr>
                                <td>Standard</td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_t_standard}
                                                 onChange={this.handleChange} name={"nb_t_standard"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.standard_t_price}
                                                 onChange={this.handleChange} name={"standard_t_price"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.standard_remaining_t}
                                                 readOnly/>
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_sm_standard}
                                                 onChange={this.handleChange} name={"nb_sm_standard"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.standard_sm_price}
                                                 onChange={this.handleChange} name={"standard_sm_price"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.standard_remaining_sm}
                                                 readOnly/>
                                </td>
                            </tr>

                            <tr>
                                <td>Low</td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_t_low}
                                                 onChange={this.handleChange} name={"nb_t_low"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.low_t_price}
                                                 onChange={this.handleChange} name={"low_t_price"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.low_remaining_t}
                                                 readOnly/>
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_sm_low}
                                                 onChange={this.handleChange} name={"nb_sm_low"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.low_sm_price}
                                                 onChange={this.handleChange} name={"low_sm_price"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.low_remaining_sm}
                                                 readOnly/>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Text>
                    <Button variant="primary" type={"button"} onClick={this.submit}>Sauvegarder</Button>
                    <Button variant="primary" type={"button"}
                            onClick={this.setCurrent}
                    >Set courant</Button>
                    <Button
                        variant={"warning"} type={"button"}
                        onClick={this.props.deleteFestival} name={this.props._id}>🗑</Button>
                </Card.Body>
            </>
        )
    }
}

export default Festival

import {Component} from "react"
import {Card, FormControl, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

// Faire le set current ou la nav vers reservation
class Festival extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: props._id,
            nb_t_premium: props.nb_t_premium,
            nb_t_standard: props.nb_t_standard,
            nb_t_low: props.nb_t_low,
            nb_sm_premium: props.nb_sm_premium,
            nb_sm_standard: props.nb_sm_standard,
            nb_sm_low: props.nb_sm_low,
            premium_t_price: props.premium_t_price,
            standard_t_price: props.standard_t_price,
            low_t_price: props.low_t_price,
            premium_sm_price: props.premium_sm_price,
            standard_sm_price: props.standard_sm_price,
            low_sm_price: props.low_sm_price
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
    }

    submit() {
        this.props.handleSubmit(this.state)
    }

    setCurrent() {
        // TODO ajouter ce festoche en festoche courant
    }

    render() {
        return (
            <>
                <Card.Body>
                    <Card.Header>
                        <Card.Title>{this.props.name} - {this.props.year}</Card.Title>
                    </Card.Header>
                    <Card.Text>
                        <Table>
                            <thead>
                            <tr>
                                <th/>
                                <th>Tables</th>
                                <th>prix/table</th>
                                <th>prix/m²</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>Premium</td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_t_premium}
                                                 onChange={this.handleChange} name={"nb_tables_premium"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.premium_t_price}
                                                 onChange={this.handleChange} name={"premium_t_price"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_sm_premium}
                                                 onChange={this.handleChange} name={"nb_tables_premium"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.premium_sm_price}
                                                 onChange={this.handleChange} name={"premium_sm_price"}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Standard</td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_t_standard}
                                                 onChange={this.handleChange} name={"nb_tables_standard"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.standard_t_price}
                                                 onChange={this.handleChange} name={"standard_t_price"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_sm_standard}
                                                 onChange={this.handleChange} name={"nb_tables_standard"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.standard_sm_price}
                                                 onChange={this.handleChange} name={"standard_sm_price"}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Low</td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_t_low}
                                                 onChange={this.handleChange} name={"nb_tables_low"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.low_t_price}
                                                 onChange={this.handleChange} name={"low_t_price"}
                                    />
                                </td>

                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_sm_low}
                                                 onChange={this.handleChange} name={"nb_tables_low"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.low_sm_price}
                                                 onChange={this.handleChange} name={"low_sm_price"}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Text>
                    <Button variant="primary" type={"button"} onClick={this.submit}>Sauvegarder</Button>
                    <Button variant="warning" type={"button"} onClick={this.props.deleteFestival} name={this.props._id}>🗑</Button>
                    <Button variant="primary">set current/ Navigation vers resa</Button>
                </Card.Body>
            </>
        )
    }
}

export default Festival

import {Component} from "react"
import {Card, FormControl, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Festival extends Component {

    constructor(props) {
        super(props);
        this.state = {
            _id: props._id,
            nb_tables_premium: props.nb_tables_premium,
            nb_tables_standard: props.nb_tables_standard,
            nb_tables_low: props.nb_tables_low,
            premium_t_price: props.premium_t_price,
            standard_t_price: props.standard_t_price,
            low_t_price: props.low_t_price,
            premium_sm_price: props.premium_sm_price,
            standard_sm_price: props.standard_sm_price,
            low_sm_price: props.low_sm_price
        }

        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
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
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_tables_premium}
                                                 onChange={this.handleChange} name={"nb_tables_premium"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.premium_t_price}
                                                 onChange={this.handleChange} name={"premium_t_price"}
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
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_tables_standard}
                                                 onChange={this.handleChange} name={"nb_tables_standard"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.standard_t_price}
                                                 onChange={this.handleChange} name={"standard_t_price"}
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
                                    <FormControl as={"input"} type={"text"} value={this.state.nb_tables_low}
                                                 onChange={this.handleChange} name={"nb_tables_low"}
                                    />
                                </td>
                                <td>
                                    <FormControl as={"input"} type={"text"} value={this.state.low_t_price}
                                                 onChange={this.handleChange} name={"low_t_price"}
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
                    <Button variant="success" type={"button"} onClick={this.submit}>Modifier</Button>
                    <Button variant="danger" type={"button"} onClick={this.props.deleteFestival} name={this.props._id}>🗑</Button>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </>
        )
    }
}

export default Festival

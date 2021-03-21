import {Card, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Festival(props) {
    return (
        <>
        <Card.Body>
            <Card.Header>
                <Card.Title>{props.name} - {props.year}</Card.Title>
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
                        <td>{props.nb_tables_premium}</td>
                        <td>{props.premium_t_price}</td>
                        <td>{props.premium_sm_price}</td>
                    </tr>

                    <tr>
                        <td>Standard</td>
                        <td>{props.nb_tables_standard}</td>
                        <td>{props.standard_t_price}</td>
                        <td>{props.standard_sm_price}</td>
                    </tr>

                    <tr>
                        <td>Low</td>
                        <td>{props.nb_tables_low}</td>
                        <td>{props.low_t_price}</td>
                        <td>{props.low_sm_price}</td>
                    </tr>
                    </tbody>
                </Table>
            </Card.Text>
            <Button variant="outline-warning" type={"button"} onClick={props.deleteFestival} name={props._id}>🗑</Button>
            <Button variant="primary">Go somewhere</Button>
        </Card.Body>
        </>
    )
}

export default Festival

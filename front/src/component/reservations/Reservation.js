import {Button, Nav} from "react-bootstrap";


function Reservation(props) {
    let sumTable = props.reservation.nb_t_premium? props.reservation.nb_t_premium: 0 +
    props.reservation.nb_t_standard? props.reservation.nb_t_standard: 0 +
        props.reservation.nb_t_low? props.reservation.nb_t_low:0
    if(!sumTable) {sumTable = 0}

    let sumSquareMeters = props.reservation.nb_sm_premium? props.reservation.nb_sm_premium: 0 +
        props.reservation.nb_sm_standard? props.reservation.nb_sm_standard: 0 +
        props.reservation.nb_sm_low? props.reservation.nb_sm_low: 0
    if(!sumSquareMeters) {sumSquareMeters = 0}

    return (
        <tr id={props.reservation._id}>
            <td><Nav.Link href={"/nav/reservation/" + props.reservation._id}>{props.exhibitor.name}</Nav.Link></td>
            <td>{props.reservation.comment}</td>
            <td>{props.reservation.state}</td>

            <td><input type={"checkbox"} checked={props.reservation.need_volunteer}
                       onChange={props.handleChange} id={props.reservation._id}
                       name={"need_volunteer"}/>
            </td>

            <td><input type={"checkbox"} checked={props.reservation.isEditorHere}
                       onChange={props.handleChange} id={props.reservation._id}
                       name={"isEditorHere"}/>
            </td>

            <td><input type={"checkbox"} checked={props.reservation.reportSent}
                       onChange={props.handleChange} id={props.reservation._id}
                       name={"reportSent"}/>
            </td>

            <td>{sumTable}</td>
            <td>{sumSquareMeters}</td>
            <td>{props.reservation.price} €</td>
            <td><Button variant={"warning"}
                onClick={props.handleDelete} name={props.reservation._id}>🗑</Button></td>
        </tr>
    )
}

export default Reservation

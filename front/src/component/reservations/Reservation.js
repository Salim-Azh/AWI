import {Button, Nav} from "react-bootstrap";


function Reservation(props) {
    let sumTable = props.reservation.nb_t_premium + props.reservation.nb_t_standard + props.reservation.nb_t_low
    if(!sumTable) {sumTable = 0}

    let sumSquareMeters = props.reservation.nb_sm_premium + props.reservation.nb_sm_standard + props.reservation.nb_sm_low
    if(!sumSquareMeters) {sumSquareMeters = 0}
    return (
        <tr id={props.reservation._id}>
            <td><Nav.Link href={"/nav/reservation/" + props.reservation._id}>{props.exhibitor.name}</Nav.Link></td>
            <td>{props.reservation.comment}</td>
            <td>{props.reservation.state}</td>
            <td><input type={"checkbox"} checked={props.reservation.need_volunteer}
                       onChange={props.handleChange} id={props.reservation._id} name={"need_volunteer"}/></td>
            <td><input type={"checkbox"} checked={props.reservation.isEditorHere}
                       onChange={props.handleChange} id={props.reservation._id} name={"isEditorHere"}/></td>
            <td><input type={"checkbox"} checked={props.reservation.reportSent}
                       onChange={props.handleChange} id={props.reservation._id} name={"reportSent"}/></td>
            <td>{sumTable}</td>
            <td>{sumSquareMeters}</td>
            <td>{props.bill}</td>
            <td>{props.total} €</td>
            <td><Button variant={"warning"}
                onClick={props.handleDelete} name={props.reservation._id}>🗑</Button></td>
        </tr>
    )
}

export default Reservation
/*
0:En discussions,
1:Presence confirme,
2:Pas de reponse,
3:considere absent,
5:absent,
6:liste des jeux demande
7:liste des jeux recu
 */

function Reservation(props) {
    return (
        <tr id={props._id}>
            <td>{props.exhibitor.name}</td>
            <td>{props.reservation.comment}</td>
            <td>{props.reservation.state}</td>
            <td><input type={"checkbox"} checked={props.reservation.need_volunteer} readOnly/></td>
            <td><input type={"checkbox"} checked={props.reservation.isEditorHere} readOnly/></td>
            <td><input type={"checkbox"} checked={props.reservation.reportSent} readOnly/></td>
            <td>{props.reservation.nb_t_premium + props.reservation.nb_t_standard + props.reservation.nb_t_low}</td>
            <td>{props.reservation.nb_sm_premium + props.reservation.nb_sm_standard + props.reservation.nb_sm_low}</td>
            <td>{props.bill}</td>
            <td>{props.total} €</td>
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

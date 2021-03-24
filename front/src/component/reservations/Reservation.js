function Reservation(props) {
    return (
        <tr id={props._id}>
            <td>{props.exhibitor}</td>
            <td>{props.comment}</td>
            <td>{props.first_contact}</td>
            <td>{props.second_contact}</td>
            <td>{props.third_contact}</td>
            <td>{props.state}</td>
            <td><input type={"checkbox"} checked={props.need_volunteer}/></td>
            <td><input type={"checkbox"} checked={props.isEditorHere}/></td>
            <td><input type={"checkbox"} checked={props.reportSent}/></td>
            <td>{props.tableReserved}</td>
            <td>{props.m2Reserved}</td>
            <td>{props.bill}</td>
            <td>{props.total} €</td>
        </tr>
    )
}

export default Reservation

function EditorFollowUp(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.comms}</td>
            <td>{props.firstContact}</td>
            <td>{props.secondContact}</td>
            <td>{props.thirdContact}</td>
            <td>{props.state}</td>
            <td><input type={"checkbox"} checked={props.needVolunteer}/></td>
            <td><input type={"checkbox"} checked={props.isEditorHere}/></td>
            <td><input type={"checkbox"} checked={props.reportSent}/></td>
            <td>{props.tableReserved}</td>
            <td>{props.m2Reserved}</td>
            <td>{props.bill}</td>
            <td>{props.total} €</td>
        </tr>
    )
}

export default EditorFollowUp

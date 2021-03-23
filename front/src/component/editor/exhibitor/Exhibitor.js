function Exhibitor(props) {
    return (
        <tr id={props._id}>
            <td>{props.name}</td>
            <td>{props.contacts}</td>
            <td><input type={"button"} onClick={props.createReservation} name={props._id} value={"résa"}/></td>
        </tr>
    )
}

export default Exhibitor

/*
<td>{props.contacts.map((contact, index) =>
                <div key={index}>{contact}, </div>
            )}
            </td>

 */

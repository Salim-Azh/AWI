import {Nav} from "react-bootstrap"

function Exhibitor(props) {
    return (
        <tr id={props._id}>
            <td><Nav.Link href={"/editeur/" + props._id}>{props.name}</Nav.Link></td>
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

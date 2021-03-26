import {Button, Nav} from "react-bootstrap"

function Exhibitor(props) {
    return (
        <tr id={props._id}>
            <td><Nav.Link href={"/nav/editeur/" + props._id}>{props.name}</Nav.Link></td>
            <td>{props.contacts[0]}</td>
            <td><Button variant={"primary"} onClick={props.createReservation} name={props._id}>Créer une réservation</Button></td>
        </tr>
    )
}

export default Exhibitor

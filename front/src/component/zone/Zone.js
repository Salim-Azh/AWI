import {Nav} from "react-bootstrap"

function Zone(props) {
    return (
        <tr id={props.zone._id}>
            <td><Nav.Link href={"/nav/zone/" + props.zone._id}>{props.zone.label}</Nav.Link></td>
            <td>{props.zone.sm_capacity}</td>
            <td><input type={"button"} onClick={props.deleteZone} name={props.zone._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Zone

import {Nav} from "react-bootstrap"

function Zone(props) {
    return (
        <tr id={props._id}>
            <td><Nav.Link href={"/nav/zone/" + props.game._id}>{props.game.name}</Nav.Link></td>
            <td><input type={"button"} onClick={props.deleteGame} name={props.game._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Zone

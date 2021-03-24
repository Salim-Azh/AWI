import {Nav} from "react-bootstrap"

// TODO faire le model et le validator mongo valide
function Game(props) {
    return (
        <tr id={props._id}>
            <td><Nav.Link href={"/jeu/" + props._id}>{props.name}</Nav.Link></td>
            <td>{props.editorName}</td>
            <td>{props.category}</td>
            <td>{props.duration}</td>
            <td>{props.zone}</td>
            <td>{props.countPlayer}</td>
            <td>{props.min_yearold}</td>
            <td>{props.recieved}</td>
            <td>{props.prototype}</td>
            <td>{props.date}</td>
            <td><input type={"button"} onClick={props.deleteGame} name={props._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Game

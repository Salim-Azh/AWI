import {Nav} from "react-bootstrap"

function EditorGame(props) {
    return (
        <tr id={props.game._id}>
            <td><Nav.Link href={"/jeu/" + props.game._id}>{props.game.name}</Nav.Link></td>
            <td>{props.game.category}</td>
            <td>{props.game.duration}</td>
            <td>{props.game.min_yearold}</td>
            <td><input type={"button"} onClick={props.deleteGame} name={props.game._id} value={"🗑"}/></td>
        </tr>
    )
}

export default EditorGame

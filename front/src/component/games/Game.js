import {Nav} from "react-bootstrap"

function Game(props) {
    return (
        <tr id={props.game._id}>
            <td><Nav.Link href={"/nav/jeu/" + props.game._id}>{props.game.name}</Nav.Link></td>
            <td>{props.editor.name}</td>
            <td>{props.game.category}</td>
            <td>{props.game.duration}</td>
            <td>{props.game.min_yearold}</td>
            <td><input type={"button"} onClick={props.deleteGame} name={props.game._id} value={"🗑"}/></td>
        </tr>
    )
}

export default Game

/*
            <td>{props.zone}</td>
            <td>{props.recieved}</td>
            <td>{props.prototype}</td>

 */

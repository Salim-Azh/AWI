import {Nav} from "react-bootstrap"

function Game(props) {

    if(props.game.name) {
        return (
            <tr id={props.game._id}>
                <td><Nav.Link href={"/nav/jeu/" + props.game._id}>{props.game.name}</Nav.Link></td>
                <td>{props.editor.name}</td>
                <td>{props.game.state}</td>
                <td>{props.game.category}</td>
                <td>{props.game.duration}</td>
                <td>{props.game.min_yearold}</td>
                <td/>
                <td><input type={"button"} onClick={props.deleteGame} name={props.game._id} value={"🗑"}/></td>
            </tr>
        )
    } else {
        return (
            <tr id={props.game.game._id}>
                <td><Nav.Link href={"/nav/jeu/" + props.game._id}>{props.game.game.name}</Nav.Link></td>
                <td>{props.editor.name}</td>
                <td>{props.game.state}</td>
                <td>{props.game.game.category}</td>
                <td>{props.game.game.duration}</td>
                <td>{props.game.game.min_yearold}</td>
                <td>{props.game.zone}</td>
                <td><input type={"button"} onClick={props.deleteGame} name={props.game.game._id} value={"🗑"}/></td>
            </tr>
        )
    }
}

export default Game

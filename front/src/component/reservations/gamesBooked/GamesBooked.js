import {Form, FormControl, FormGroup} from "react-bootstrap"

function GamesBooked(props) {
    const options = [
        "en attente de réception",//received=false;bring_by_exhibitor=false;
        "reçu",//received=true;bring_by_exhibitor=false;
        "apporté par exposant",//received=false;bring_by_exhibitor=true;
        "à renvoyer",//proto=true; received=true
        "renvoyé"
    ]
    const optionsState = options.map(option =>
        <option key={option} value={option}>{option}</option>
    )

    return (
        <tr id={props.game._id}>
            <td>{props.game.name}</td>
            <td><FormControl as={"input"} value={props.total_qte}/></td>
            <td><FormControl as={"input"} value={props.exposed_qte}/></td>
            <td><FormControl as={"input"} value={props.zone}/></td>
            <td><Form.Check checked={props.proto}/></td>
            <td>
                <FormGroup value={props.state}>
                    <FormControl as={"select"}>
                        {optionsState}
                    </FormControl>
                </FormGroup>
            </td>
            <td><input type={"button"} onClick={props.handleDelete} name={props.game._id} value={"🗑"}/></td>
        </tr>
    )
}

export default GamesBooked

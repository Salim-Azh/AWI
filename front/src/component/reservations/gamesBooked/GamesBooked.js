import {Form, FormControl, FormGroup} from "react-bootstrap"

function GamesBooked(props) {
    const options = [
        "en attente de réception",//received=false;bring_by_exhibitor=false;
        "reçu",//received=true;bring_by_exhibitor=false;
        "apporté par exposant",//received=false;bring_by_exhibitor=true;
        "à placer",
        "à renvoyer",//proto=true; received=true
        "renvoyé"
    ]
    const optionsState = options.map(option =>
        <option id={props.game.game} key={option} name={"state"} value={option}>{option}</option>
    )

    console.log("game", props.game.game)
    return (
        <tr id={props.game.game}>
            <td>{props.game.name}</td>
            <td>
                <FormControl
                    as={"input"} type={"number"}
                    value={props.game.total_qte}
                    id={props.game.game} name={"total_qte"}
                    onChange={props.handleChange}
                />
            </td>
            <td>
                <FormControl
                    as={"input"} type={"number"}
                    max={props.game.total_qte}
                    value={props.game.exposed_qte}
                    id={props.game.game} name={"exposed_qte"}
                    onChange={props.handleChange}
                />
            </td>
            <td>
                <FormControl
                    as={"input"}
                    name={"zone"}
                    value={props.zone}
                    onChange={props.handleChange}
                />
            </td>
            <td>
                <Form.Check
                    checked={props.game.proto}
                    id={props.game.game} name={"proto"}
                    onChange={props.handleChange}
                />
            </td>
            <td>
                <FormGroup value={props.game.state}>
                    <FormControl as={"select"} onChange={props.handleChange}>
                        {optionsState}
                    </FormControl>
                </FormGroup>
            </td>
            <td><input type={"button"} onClick={props.handleDelete} name={props.game._id} value={"🗑"}/></td>
        </tr>
    )
}

export default GamesBooked

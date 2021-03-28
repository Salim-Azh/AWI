import {Table} from "react-bootstrap";
import GamesBooked from "./GamesBooked";

function GameTable(props){
    const games = props.games.map(game =>
        <GamesBooked
            handleDelete={props.handleDelete}
            game={game}
        />
    )
    return (
        <Table striped bordered hover size={"sm"}>
            <thead>
            <tr>
                <th>Nom du jeu</th>
                <th>qté jeu</th>
                <th>qté jeu exposé</th>
                <th>Zone</th>
                <th>Prototype ?</th>
                <th>état</th>
            </tr>
            </thead>
            <tbody>{games}</tbody>
        </Table>
        )
}

export default GameTable

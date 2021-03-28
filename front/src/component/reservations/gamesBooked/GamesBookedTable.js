import {Table} from "react-bootstrap";
import GamesBooked from "./GamesBooked";
import {Component} from "react";

class GameTable extends Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(event) {
        // TODO faire route sur DELETE games to reservation
    }

    render() {
        const games = this.props.games.map(game =>
            <GamesBooked
                game={game}
                deleteGame={this.handleDelete}
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
}

export default GameTable

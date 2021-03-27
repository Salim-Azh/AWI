import {Component} from "react"
import {Nav, Table} from "react-bootstrap";

function GameTable(props){
    return (
        <Table striped bordered hover size={"sm"}>
            <thead>
            <tr>
                <th>Nom du jeu</th>
                <th>qté jeu</th>
                <th>qté jeu exposé</th>
                <th>Zone</th>
                <th>état</th>
            </tr>
            </thead>
            <tbody>{props.games}</tbody>
        </Table>
        )
}

export default GameTable

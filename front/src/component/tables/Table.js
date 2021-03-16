import {useState} from "react";
import GameForm from "../games/GameForm";

function Table(props) {
    const [games, setGames] = useState(props.games)
    const addGame = (newGame) => {
        setGames([...games, newGame])
    }

    return (
        <div>
            <h2>{props.name}</h2>
            <GameForm handleClick={addGame}/>
        </div>
    )
}

export default Table

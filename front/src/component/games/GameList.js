import {useState} from "react";

import Game from "./Game"
import GameForm from "./GameForm"

function GameList(props) {
    const [games, setGames] = useState(props.games)
    const addGame = (newGame) => {
        setGames([...games, newGame])
    }

    return (
        <div>
                {games.map((t) =>
                    <Game key={t.id} name={t.name} category={t.category}/>
                )}
            <GameForm handleClick={addGame}/>
        </div>
    )
}

export default GameList
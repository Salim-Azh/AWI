import {useEffect, useState} from "react";
import request from 'superagent';

import Game from "./Game"
import GameForm from "./GameForm"

const urlApi = require("../../public/urlApi")

/*
[
    {id: 0, name: "Jeu de l'oie", category: "enfant"},
    {id: 1, name: "l'autre jeu", category: "Adulte"},
]
 */

function GameList() {
    /*
    const [games, setGames] = useState(props.games)
    */
    const addGame = (newGame) => {
        setGames([...games, newGame])

        request
            .post(urlApi.apiUrlGames)
            .send(newGame)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (err || !res.ok) {
                    console.log('Oh no! err' + err);
                } else {
                    console.log('Success');
                }
            });
    }

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [games, setGames] = useState([]);

    // Remarque : le tableau vide de dépendances [] indique
    // que useEffect ne s’exécutera qu’une fois, un peu comme
    // componentDidMount()
    useEffect(() => {
        fetch(urlApi.apiUrlGames)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setGames(result.games);
                },
                // Remarque : il faut gérer les erreurs ici plutôt que dans
                // un bloc catch() afin que nous n’avalions pas les exceptions
                // dues à de véritables bugs dans les composants.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Erreur : {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Chargement...</div>;
    } else {
        return (
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        <Game key={game.id} name={game.name} category={game.category}/>
                    </li>
                ))}
                <GameForm handleClick={addGame}/>
            </ul>
        );
    }
}

export default GameList
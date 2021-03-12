import Game from "./Game";
import {post} from "superagent";
import axios from "superagent/lib/client";

const apiUrl = require("../../public/urlApi")

export function getGamesFromDB() {
    return fetch(apiUrl.Games)
        .then(r => r.json())
        .then((response) => {
            return response.games
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

export function filterGamesByName(games, filterText) {
    let rows = []
    if(games) {
        games.map(game => {
            if (game && (game.name.toLowerCase().includes(filterText))) {
                rows.push(
                    <Game
                        key={game._id}
                        name={game.name}
                        category={game.category}
                        handleDelete={deleteGames(game)}
                    />
                )
            }
        })
        return rows
    }
}

export function filterGamesByCategory(games, filterText) {
    let rows = []
    if(games) {
        games.map(game => {
            if (game && (game.category.toLowerCase().includes(filterText))) {
                rows.push(
                    <Game
                        key={game._id}
                        name={game.name}
                        category={game.category}
                        handleDelete={deleteGames(game)}
                    />
                )
            }
        })
        return rows
    }
}

// TODO ajouter dans le front l'envoie de l'editor id
export function addGames(game) {
    axios.post(apiUrl.Games, game)
        .then(data => console.log(data))
}

export function deleteGames(game) {
    console.log(game._id)

    fetch(apiUrl.Games + "/" + game._id, { method: 'DELETE' })
        .then(() => console.log("delete success"));
}

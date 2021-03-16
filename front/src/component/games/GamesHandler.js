import Game from "./Game";
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

export function filterGamesByName(games, filterText, handleDelete) {
    let rows = []
    if(games) {
        games.map(game => {
            if (game && (game.name.toLowerCase().includes(filterText))) {
                rows.push(
                    <Game
                        key={game._id}
                        _id={game._id}
                        name={game.name}
                        category={game.category}
                        handleDelete={handleDelete}
                        deleteGame={deleteGame}
                    />
                )
            }
        })
        return rows
    }
}

export function filterGamesByCategory(games, filterText, handleDelete) {
    let rows = []
    if(games) {
        games.map(game => {
            if (game && (game.category.toLowerCase().includes(filterText))) {
                rows.push(
                    <Game
                        key={game._id}
                        _id={game._id}
                        name={game.name}
                        category={game.category}
                        handleDelete={handleDelete}
                        deleteGame={deleteGame}
                    />
                )
            }
        })
        return rows
    }
}

// TODO ajouter dans le front l'envoie de l'editor id
export function addGames(game) {
    let data = new FormData()
    data.append("json", JSON.stringify(game))
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(game)
    }
    return fetch(apiUrl.Games, param)
}

export let _handleDelete

export function setHandleDelete(handler) {
    _handleDelete = handler
}

export function deleteGame(event) {
    const gameId = event.target.name

    fetch(apiUrl.Games + "/" + gameId, { method: 'DELETE' })
        .then(() => _handleDelete(gameId))
}
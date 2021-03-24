import Game from "./Game";
import EditorGame from "../editor/EditorGame";
const apiUrl = require("../../public/urlApi")
const errorHandler = require("../error/errorHandler")

export function getGamesFromDB() {
    return fetch(apiUrl.Games)
        .then(r => r.json())
        .then((response) => {
            return response.response
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

export function getGameFromDB(gameId) {
    return fetch(apiUrl.Games + "/" + gameId)
        .then(r => r.json())
        .then((response) => {
            return response.game
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

export function createGame(game) {
    return (
        <Game
            key={game._id}
            _id={game._id}
            name={game.name}
            editorName={game.editor.name}
            category={game.category}
            duration={game.duration}
            deleteGame={deleteGame}
        />
    )
}

export function createGameFromEditor(game) {
    return (
        <EditorGame
            key={game._id}
            _id={game._id}
            name={game.name}
            category={game.category}
            duration={game.duration}
            deleteGame={deleteGame}
        />
    )
}

export function filterGamesByName(games, filterText) {
    let rows = []
    if(games) {
        games.map(game => {
            if (game && (game.name.toLowerCase().includes(filterText))) {
                rows.push(createGame(game))
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
                rows.push(createGame(game))
            }
        })
        return rows
    }
}

export function filterGamesByEditor(games, filterText) {
    let rows = []
    if(games) {
        games.map(game => {
            if (game && (game.editor.name.toLowerCase().includes(filterText))) {
                rows.push(createGame(game))
            }
        })
        return rows
    }
}

// TODO ajouter dans le front l'envoie de l'editor id
export function addGames(game) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify(game)
    }
    return fetch(apiUrl.Games, param)
}

let _handleDelete
export function setHandleDelete(handler) {
    _handleDelete = handler
}

export function deleteGame(event) {
    const gameId = event.target.name

    return fetch(apiUrl.Games + "/" + gameId, { method: 'DELETE' })
        .then(() => _handleDelete(gameId))
}

export function updateGame(game) {
    const param = {
        headers: {'Content-Type': 'application/json'},
        method: "PUT",
        body: JSON.stringify(game)
    }
    console.log(game._id)

    return fetch(apiUrl.Games + "/" + game._id, param)
        .then(r => errorHandler.handleResponse(r, "Modification du jeu"))
}

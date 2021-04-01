import Game from "./Game";
import EditorGame from "../editor/EditorGame";
const apiUrl = require("../../public/urlApi")

export function getGamesFromDB() {
    return fetch(apiUrl.Games)
        .then(r => r.json())
        .then((response) => {
            return response
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
            return response
        })
        .catch(e => {
            console.log(e.stack)
            console.log(e.message)
        })
}

export function getFestivalGames() {
    return fetch(apiUrl.Games + "/games")
        .then(r => r.json())
        .then((response) => {
            return response
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
            game={game}
            editor={game.editor}
            deleteGame={deleteGame}
        />
    )
}

export function createGameFromEditor(game) {
    return (
        <EditorGame
            key={game._id}
            game={game}
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

export function filterGamesByZone(games, filterText) {
    let rows = []
    if(games) {
        games.map(game => {
            if (game && (game.zone.toLowerCase().includes(filterText))) {
                rows.push(createGame(game))
            }
        })
        return rows
    }
}

export function filterGamesByState(games, filterText) {
    let rows = []
    if(games) {
        games.map(game => {
            if (game && (game.state.toLowerCase().includes(filterText))) {
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

    return fetch(apiUrl.Games + "/" + game._id, param)
}

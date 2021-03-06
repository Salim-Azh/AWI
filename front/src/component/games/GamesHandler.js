import Game from "./Game";

const apiUrl = require("../../public/urlApi")

export function getGamesFromDB() {
    return fetch(apiUrl.apiUrlGames)
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
                        category={game.category}/>
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
                        category={game.category}/>
                )
            }
        })
        return rows
    }
}

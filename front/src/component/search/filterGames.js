const filterGames = (games, query) => {
    if (!query) {
        return games;
    }

    return games.filter((game) => {
        const gameName = game.name.toLowerCase();
        return gameName.includes(query.toLowerCase());
    });
};

export default filterGames

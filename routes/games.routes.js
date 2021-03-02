const express = require('express')
const router = express.Router()

// Controllers
const listingGameController = require("../controllers/gameController/listingGame.controller")
const addGameController = require("../controllers/gameController/addGame.controller")

router.get("/", listingGameController.getListOfGames)
router.post("/", addGameController.addGame)

module.exports = router
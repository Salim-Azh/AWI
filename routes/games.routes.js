const express = require('express')
const router = express.Router()

// Controllers
const gameController = require("../controllers/Game.controller")

router.get("/", gameController.getListOfGames)
router.post("/", gameController.addGame)
router.delete("/:id", gameController.deleteGame)

module.exports = router

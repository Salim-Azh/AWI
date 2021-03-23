const express = require('express')
const router = express.Router()

// Controllers
const gameController = require("../controllers/Game.controller")

router.get("/", gameController.getListOfGames)
router.get("/:id", gameController.getGame)
router.post("/", gameController.addGame)
router.delete("/:id", gameController.deleteGame)
router.put("/:id", gameController.updateGame)

module.exports = router

const express = require('express')
const router = express.Router()

// Controllers
const festivalController = require("../controllers/Festival.controller")

router.get("/", festivalController.getListOfFestivals)
router.post("/", festivalController.addFestival)
router.delete("/:id", festivalController.deleteFestival)

module.exports = router

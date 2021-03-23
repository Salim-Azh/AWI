const express = require('express')
const router = express.Router()

// Controllers
const exhibitorController = require("../controllers/Exhibitor.controller")

router.get("/", exhibitorController.getListOfExhibitors)

module.exports = router

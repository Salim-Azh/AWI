const express = require('express')
const router = express.Router()

// Controllers
const reservationController = require("../controllers/Reservation.controller")

router.get("/", reservationController.getListOfFestivals)
router.post("/", reservationController.addFestival)
router.delete("/:id", reservationController.deleteFestival)
router.put("/:id", reservationController.updateFestival)

module.exports = router

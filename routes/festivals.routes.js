const express = require('express')
const router = express.Router()

// Controllers
const festivalController = require("../controllers/Festival.controller")
const reservationController = require("../controllers/Reservation.controller")

router.get("/", festivalController.getListOfFestivals)
router.post("/", festivalController.addFestival)
router.delete("/:id", festivalController.deleteFestival)
router.put("/:id", festivalController.updateFestival)
router.get("/reservations", reservationController.getFestivalReservations)
router.post("/reservations", reservationController.addReservation)

module.exports = router

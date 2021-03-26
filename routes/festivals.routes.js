const express = require('express')
const router = express.Router()

// Controllers
const festivalController = require("../controllers/Festival.controller")
const reservationController = require("../controllers/Reservation.controller")

router.get("/", festivalController.getListOfFestivals)
router.post("/", festivalController.addFestival)

router.get("/reservations", reservationController.getFestivalReservations)
router.post("/reservations", reservationController.addReservation)

router.get("/reservations/:id", reservationController.getReservation)

router.put("/:id", festivalController.updateFestival)
router.put("/:id/current", festivalController.setCurrent)

router.delete("/:id", festivalController.deleteFestival)

module.exports = router

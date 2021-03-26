const express = require('express')
const router = express.Router()

// Controllers
const festivalController = require("../controllers/Festival.controller")
const reservationController = require("../controllers/Reservation.controller")

router.get("/", festivalController.getListOfFestivals)
router.post("/", festivalController.addFestival)
router.put("/:id", festivalController.updateFestival)
router.delete("/:id", festivalController.deleteFestival)

router.put("/:id/current", festivalController.setCurrent)

router.get("/reservations", reservationController.getFestivalReservations)
router.post("/reservations", reservationController.addReservation)

router.get("/reservations/:id", reservationController.getReservation)
router.put("/reservations/:id", reservationController.updateReservation)

module.exports = router

const express = require('express')
const router = express.Router()

// Controllers
const festivalController = require("../controllers/Festival.controller")
const reservationController = require("../controllers/Reservation.controller")

router.get("/", festivalController.getListOfFestivals)
router.get("/reservations", reservationController.getFestivalReservations)

router.post("/", festivalController.addFestival)
router.post("/reservations", reservationController.addReservation)

router.put("/:id", festivalController.updateTablesSmNumberAndPrices)
router.put("/:id/current", festivalController.setCurrent)

router.delete("/:id", festivalController.deleteFestival)

module.exports = router

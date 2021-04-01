const express = require('express')
const router = express.Router()

// Controllers
const festivalController = require("../controllers/Festival.controller")
const reservationController = require("../controllers/Reservation.controller")
const zoneController = require("../controllers/zone.controller")

router.get("/", festivalController.getListOfFestivals)
router.post("/", festivalController.addFestival)
router.put("/:id", festivalController.updateFestival)
router.delete("/:id", festivalController.deleteFestival)

router.get("/current", festivalController.getCurrentFestival)
router.put("/:id/current", festivalController.setCurrent)

router.get("/reservations", reservationController.getFestivalReservations)
router.post("/reservations", reservationController.addReservation)
router.post("/reservations/:id", reservationController.updateReservation)

router.get("/reservations/:id", reservationController.getReservation)
router.put("/reservations/:id", reservationController.updateReservation)
router.delete("/reservations/:id", reservationController.deleteReservation)

router.get("/zones", festivalController.getFestivalZones)
router.get("/games", festivalController.getFestivalGames)

router.get("/editors", festivalController.getFestivalEditors)
router.get("/exhibitors", festivalController.getFestivalExhibitors)

module.exports = router
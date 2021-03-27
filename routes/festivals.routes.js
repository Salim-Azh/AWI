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
router.post("/reservations/:id", reservationController.updateReservation)

router.get("/reservations/:id", reservationController.getReservation)
router.put("/reservations/:id", reservationController.updateReservation)
router.delete("/reservations/:id", reservationController.deleteReservation)

/*router.get("/zones", zoneController.getZones)
router.post("/zones", zoneController.addZone)

router.get("/zones/:id", zoneController.getZone)
router.put("/zones/:id", zoneController.updateZone)
router.delete("/zones/:id", zoneController.deleteZone)*/

module.exports = router

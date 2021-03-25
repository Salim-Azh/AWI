const express = require('express')
const router = express.Router()

// Controllers
const reservationController = require("../controllers/Reservation.controller")

router.post("/", reservationController.addReservation)
router.post("/:id", reservationController.updateReservationCheckBox)
router.delete("/:id", reservationController.deleteReservation)
router.put("/:id", reservationController.updateReservation)

module.exports = router

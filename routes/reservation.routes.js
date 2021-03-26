const express = require('express')
const router = express.Router()

// Controllers
const reservationController = require("../controllers/Reservation.controller")

router.delete("/:id", reservationController.deleteReservation)

module.exports = router

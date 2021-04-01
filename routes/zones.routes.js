const express = require('express')
const router = express.Router()

const zoneController = require("../controllers/zone.controller")

router.get("/", zoneController.getZones)
router.get("/:id", zoneController.getZone)
router.post("/", zoneController.addZone)
router.put("/:id", zoneController.updateZone)
router.delete("/:id", zoneController.deleteZone)

module.exports = router
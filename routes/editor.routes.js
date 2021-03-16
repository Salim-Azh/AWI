const express = require('express')
const router = express.Router()

// Controllers
const editorController = require("../controllers/Editor.controller")

router.get("/", editorController.getListOfEditors)
router.post("/", editorController.addEditor)
router.delete("/:id", editorController.deleteEditor)

module.exports = router

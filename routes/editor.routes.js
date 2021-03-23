const express = require('express')
const router = express.Router()

// Controllers
const editorController = require("../controllers/Editor.controller")

router.get("/", editorController.getListOfEditors)
router.get("/:id", editorController.getEditor)
router.post("/", editorController.addEditor)
router.delete("/:id", editorController.deleteEditor)
router.put("/:id", editorController.updateEditor)

module.exports = router

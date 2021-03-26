const router = require("express").Router()
const authController = require("../controllers/auth.controller")
const userController = require("../controllers/user.controller")

//auth
router.post("/register", authController.signUp)
router.post("/login", authController.signIn)
router.get("/logout", authController.logout)

// user db
router.get("/", userController.getAllUsers)
router.get("/:id", userController.userInfo)

router.put("/:id/email", userController.updateUserEmail)
router.put("/:id/pwd", userController.updateUserPwd)
router.put("/:id/right", userController.updateUserRight)

router.delete("/:id", userController.deleteUser)

module.exports = router

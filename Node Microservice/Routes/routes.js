const router = require("express").Router();
const UserController = require("../controller/UserController");

router.get("/travelplans",UserController.AllTravelPlans)

// router.get("/:userId",UserController.getUserById)
router.get("/user/:userId", UserController.getUserDetails);

module.exports = router;
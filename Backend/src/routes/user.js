const express = require("express");
const { getUserDashboard, updateProfile } = require("../controllers/user");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect);
router.use(authorize("user", "admin"));

router.get("/dashboard", getUserDashboard);
router.put("/profile", updateProfile);

module.exports = router;

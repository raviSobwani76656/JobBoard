const express = require("express");
const { isAdmin } = require("../middleware/isAdminMiddleware")

const router = express.Router();
const { createJobPost, updateJobPost, deleteJobPost, getJobPostBySlug } = require("../controllers/Job-Controller");
const { authMiddleware } = require("../middleware/authmiddleware")
const { autherizeRoles } = require("../middleware/autherizeMiddleware")


router.post("/createJobPost", authMiddleware, isAdmin, autherizeRoles("admin", "user"), createJobPost);
router.delete("/deleteJobPost/:slug", authMiddleware, isAdmin, autherizeRoles("admin", "user"), deleteJobPost);
router.get("/getJobPostBySlug/:slug", authMiddleware, isAdmin, autherizeRoles("admin", "user"), getJobPostBySlug);


router.put("/updateJobPost/:slug", authMiddleware, isAdmin, autherizeRoles("admin", "user"), updateJobPost);


module.exports = router;



const express = require("express");
const { authMiddleware } = require("../middleware/authmiddleware")
const { autherizeRoles } = require("../middleware/autherizeMiddleware")

const { allApplication, createApplication, UpdateApplication, deleteApplication, fetchApplication, getApplication, getApplicationOfUser, updateApplicationStatus } = require("../controllers/Application-controller");
const { updateJobPost } = require("../controllers/Job-Controller");
const { isAdmin } = require("../middleware/isAdminMiddleware");

const router = express.Router();


router.post("/createApplication", authMiddleware, autherizeRoles("admin", "user"), createApplication);
router.get("/getApplication/:jobId", authMiddleware, autherizeRoles("admin", "user"), getApplication);

router.put("/updateApplication/:applicationId", authMiddleware, autherizeRoles("admin", "user"), UpdateApplication);

router.delete("/deleteApplication/:applicationId", authMiddleware, autherizeRoles("admin", "user"), deleteApplication);

router.get("/getApplicationOfUser", authMiddleware, autherizeRoles("admin", "user"), getApplicationOfUser)

router.post("/updateApplicationStatus/:applicationId", authMiddleware, isAdmin, updateApplicationStatus);

router.get("/fetchApplication/:slug", fetchApplication);

router.get("/allApplication", allApplication);


module.exports = router;
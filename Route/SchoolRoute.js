const express = require('express')
const router = express.Router()

const schoolController = require('../Controller/School_Controller')

router.post("/addSchool",schoolController.addSchool)
router.get("/listSchools",schoolController.listSchool)

module.exports = router;

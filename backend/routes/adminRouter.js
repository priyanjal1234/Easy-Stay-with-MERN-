const express = require('express')
const router = express.Router()
const { isLoggedin } = require('../middlewares/isLoggedin')
const { isAdmin } = require('../middlewares/isAdmin')
const { createRoom, deleteRoom } = require('../controllers/adminController')
const upload = require('../config/multerConfig')


router.post("/room/create",isLoggedin,isAdmin,upload.single("image"),createRoom)

router.delete("/delete/:id",isLoggedin,isAdmin,deleteRoom)

module.exports = router
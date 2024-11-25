const logincontroll = require('../Controllers/logincontroll')

const express = require('express') 

const router = express.Router()

router.post('/login',logincontroll.vendorLogin)

module.exports = router
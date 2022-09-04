const router = require('express').Router()


router.use('/assignment2',require('./contact.service'))
router.use('/assignment3',require('./tax.service'))

module.exports = router
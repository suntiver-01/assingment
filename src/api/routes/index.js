const router = require('express').Router()

router.use('/assignment1',require('./email.service'))
router.use('/assignment2',require('./contact.service'))
router.use('/assignment3',require('./tax.service'))

module.exports = router
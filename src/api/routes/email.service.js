
const router = require('express').Router()

const controllersEmail = require('../controllers/email.controller')

router.post('/onSentEmail',controllersEmail.onSentEmail)


module.exports = router
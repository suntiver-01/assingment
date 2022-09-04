
const router = require('express').Router()

const controllersTax = require('../controllers/tax.controller')

router.post('/oncalTax',controllersTax.oncalTax)


module.exports = router
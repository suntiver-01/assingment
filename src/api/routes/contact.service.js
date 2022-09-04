
const router = require('express').Router()
const upload =  require('../middleware/upload')

const controllers = require('../controllers/contacts.controller')


router.post('/onLogin',controllers.onLogin)

router.post('/onRegister',controllers.onRegister)
router.post('/onCreateGroup',controllers.onCreateGroup)
router.post('/onCreateContact',upload.single("image"),controllers.onCreateContact)

router.put('/onUpdateUser/:userId',controllers.onUpdateUser)
router.put('/onUpdateGroup/:groupId',controllers.onUpdateGroup)
router.put('/onUpdateContact/:contactId',upload.single("image"),controllers.onUpdateContact)

router.delete('/onDeleteGroup/:groupId',controllers.onDeleteGroup)
router.delete('/onDeleteContact/:contactId',controllers.onDeleteContact)

router.get('/getGroups/:userId',controllers.getGroups)
router.get('/getContacts/:groupId',controllers.getContacts)

module.exports = router
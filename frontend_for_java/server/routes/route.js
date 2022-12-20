
const { Router } = require("express")
const controller = require("../controller/controller.js")

const router = new Router()

router.get('/actionstable', controller.getactions)
router.get('/triggersstable', controller.gettriggers)
router.get('/containerstable', controller.getcontainers)
router.get('/appsstable', controller.getapps)


module.exports = router
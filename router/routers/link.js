const Router = require('express')
const getLinks = require('../../controllers/linkController')
const getNewsList = require('../../puppeteer/getNewsList')
const router = Router()
router.get('/', (req, res) => {
  res.send('ok link')
})
module.exports = router

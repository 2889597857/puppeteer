const Router = require('express')
const { addWebsite } = require('../../controllers/websiteController')

const router = Router()

router.get('/', async (req, res) => {
  let result = await addWebsite()
  res.json(result)
})

module.exports = router

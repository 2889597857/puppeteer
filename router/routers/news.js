const Router = require('express')
const { getContent } = require('../../controllers/contentController')
const router = Router()

router.get('/', async (req, res) => {
  const data = await getContent()
  res.json({ code: 200, data })
})

module.exports = router

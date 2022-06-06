const Router = require('express')
const {
  addWebsite,
  findWebsite
} = require('../../controllers/websiteController')

const router = Router()

router.get('/', async (req, res) => {
  let result = await addWebsite()
  console.log(result)
  if (result) {
    res.json({
      code: 200,
      data: result
    })
  } else {
    res.json({
      code: 400
    })
  }
})

module.exports = router

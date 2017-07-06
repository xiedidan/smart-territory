import express from 'express'
let router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '电子航道图应用系统' });
})

module.exports = router

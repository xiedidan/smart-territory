import express from 'express'
import userRouter from './users'

let router = express.Router()

router.use(userRouter)

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: '电子航道图应用系统' });
})

module.exports = router

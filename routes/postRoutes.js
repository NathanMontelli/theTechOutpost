const router = require('express').Router()
const { Post, Note, User } = require('../models')
const passport = require('passport')

// router.get('/posts', async function (req, res) {
//   const posts = await Post.findAll()
//   res.json(posts)
// })
router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findAll({ include: [User, Note] })
  res.json(posts)
})

router.get('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  const post = await Post.findOne({ where: { id: req.params.id }, include: [User, Note] })
  res.json(post)
})

router.post('/posts', passport.authenticate('jwt'), async function (req, res) {
  const post = await Post.create({
    title: req.body.title,
    body: req.body.body,
    uid: req.user.id
  })
  res.json()
})

router.delete('/posts/:id', passport.authenticate('jwt'), async function ({ params: { id } }, res) {
  await Post.destroy({ where: { id } })
  res.sendStatus(200)
})

module.exports = router

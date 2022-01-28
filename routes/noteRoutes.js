const router = require('express').Router()
const { Post, User, Note } = require('../models')
const passport = require('passport')

// router.get('/notes', async function (req, res) {
//   const notes = await Note.findAll()
//   res.json(notes)
// })
// GET all comments
router.get('/notes', passport.authenticate('jwt'), async function (req, res) {
  const notes = await Note.findAll({ include: [User, Post] })
  res.json(notes)
})

router.post('/notes', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.create({
    body: req.body.body,
    uid: req.user.id,
    pid: req.body.pid
  })
  res.json(note)
})

router.get('/notes/:id', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.findAll({ where: { pid: req.params.id }, include: [User] })
  res.json(note)
})

router.delete('/notes/:id', passport.authenticate('jwt'), async function (req, res) {
  await Note.destroy({ where: { id: req.params.id } })
  res.sendStatus(200)
})

module.exports = router

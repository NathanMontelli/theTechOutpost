const { User, Post, Note } = require('../models')

async function seeder() {
  console.log('Seeding Data')

  await User.bulkCreate(require('./userSeed.js'))
  await Post.bulkCreate(require('./postSeed.js'))
  await Note.bulkCreate(require('./noteSeed.js'))

  console.log('Data Seeded')
}

seeder()
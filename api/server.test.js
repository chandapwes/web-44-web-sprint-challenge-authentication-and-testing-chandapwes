// Write your tests here
const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')
// const User = require('./users/users-model')

const user1 = { id: 1, username: 'Georgia', password: 1111 }


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

it('correct env var', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[Post] / register', () => {
  it('adds user to the db', async () => {
    const [id] = await db('users').insert(user1)
    let user = await db('users').where({id}).first()
    expect(user).toBeTruthy()
  })
  // it('respond with the new user', async () => {
  //   await db('users').insert(user1)
  //   let user = await request(server).post('/auth/register')
  //   expect(user.body).toMatchObject(user1)
  // })
})

test('sanity', () => {
  expect(true).toBe(true)
})


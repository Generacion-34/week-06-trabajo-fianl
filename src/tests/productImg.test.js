const request = require("supertest")
const app = require('../app')
const path = require("path")

const URL_BASE = '/api/v1/product_images'

let TOKEN

beforeAll(async () => {
  const user = {
    email: "yoneison@gmail.com",
    password: "yoneison1234",
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

  TOKEN = res.body.token
})

test("POST -> URL_BASE, should return statusCode 201, res.body.url to be defined and res.body.filename to be defined", async () => {

  const localImage = path.join(__dirname, '..', 'public', 'images.jpg')

  const res = await request(app)
    .post(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN} `)
    .attach('image', localImage)

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.filename).toBeDefined()
  expect(res.body.url).toBeDefined()
})

test("GET -> 'URL_BASE', should return statusCode 200, and res.body.length === 1", async () => {
  const res = await request(app)
    .get(URL_BASE)
    .set("Authorization", `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})
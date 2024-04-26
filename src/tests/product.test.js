const Category = require("../models/Category")
const request = require("supertest")
const app = require('../app')

const BASE_URL = '/api/v1/products'

let category
let TOKEN

beforeAll(async () => {

  const user = {
    email: "yoneison@gmail.com",
    password: "yoneison1234"
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

  TOKEN = res.body.token

  category = await Category.create({ name: 'tecno' })
})

test("POST -> BASE_URL, should return statusCode 201, and res.body.title === products.title", async () => {

  const product = {
    title: "Celular",
    description: "iphone 15 256gb",
    price: 890,
    categoryId: category.id
  }

  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)

  await category.destroy()

})
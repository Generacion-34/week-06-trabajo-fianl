require("../models")

const Category = require("../models/Category")
const request = require("supertest")
const app = require('../app')

const BASE_URL = '/api/v1/products'

let category
let TOKEN
let productId
let product

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

  product = {
    title: "Celular",
    description: "iphone 15 256gb",
    price: 890,
    categoryId: category.id
  }

  const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

  productId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)

})

test("GET -> BASE_URL, should retunr statusCode 200, and res.body===1", async () => {

  const res = await request(app)
    .get(BASE_URL)

  // console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
})

test('GET -> BASE_URL/:id, should return statusCode 201, and res.body.length ===1 ', async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.title).toBe(product.title)

  await category.destroy() //! siempre va en la ultima linea, del ultimo test del archivo
})
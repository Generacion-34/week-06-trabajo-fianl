require('../models')

const request = require("supertest")
const app = require('../app')
const Product = require("../models/Product")

const URL_BASE = '/api/v1/cart'

let TOKEN
let userId
let productBody
let product
let cartId
let cart

beforeAll(async () => {
  const user = {
    email: "yoneison@gmail.com",
    password: "yoneison1234"
  }

  const res = await request(app)
    .post('/api/v1/users/login')
    .send(user)

  TOKEN = res.body.token
  userId = res.body.user.id

  productBody = {
    title: 'iphone test',
    description: "iphone description",
    price: 3.34
  }

  product = await Product.create(productBody)

})

test("POST -> 'URL_BASE', should return status code 201, and res.body.quantity === cart.quantity", async () => {

  cart = {
    quantity: 5,
    productId: product.id
  }

  const res = await request(app)
    .post(URL_BASE)
    .send(cart)
    .set("Authorization", `Bearer ${TOKEN}`)

  cartId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(cart.quantity)

})


test("GET -> URL_BASE, should return statusCode 200, and res.body.lenght === 1", async () => {

  const res = await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

})

test('GET -> URL_BASE/:id shoould return statusCode 200, and res.body.quantity ==== cart.quantity', async () => {

  const res = await request(app)
    .get(`${URL_BASE}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(cart.quantity)

})


test("PUT -> URL_BASE/:id, should return status code 200, and res.body.quantity === bodyUpdate.quantity", async () => {

  const bodyUpdate = { quantity: 6 }
  const res = await request(app)
    .put(`${URL_BASE}/${cartId}`)
    .send(bodyUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)


  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.quantity).toBe(bodyUpdate.quantity)
})

test("Delete 'URL_BASE/:id', should return statusCode 204", async () => {
  const res = await request(app)
    .delete(`${URL_BASE}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

  expect(res.statusCode).toBe(204)

  await product.destroy() //! siempre al final del archivo, el ultimo test del mismo
})






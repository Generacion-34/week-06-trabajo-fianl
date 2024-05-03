const catchError = require('../utils/catchError');
const Product = require('../models/Product');
const Category = require('../models/Category');

const getAll = catchError(async (req, res) => {
  const results = await Product.findAll({ include: [Category] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Product.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id, { include: [Category] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Product.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setImages = catchError(async (req, res) => { //products/:id/images

  //! Localizacion del producto
  const { id } = req.params
  const product = await Product.findByPk(id)
  if (!product) res.sendStatus(404)

  //! Si el producto, debería setearles las imagenes
  await product.setProductImg(req.body)

  //! Debo leer los las imagenes seteadas
  const images = await product.getProductImg()

  //! Armo el json
  return res.json(images)
})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setImages
}


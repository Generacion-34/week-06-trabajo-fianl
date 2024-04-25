const catchError = require('../utils/catchError');
const Category = require('../models/Category');

const getAll = catchError(async (req, res) => {
  const results = await Category.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Category.create(req.body);
  return res.status(201).json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Category.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});


module.exports = {
  getAll,
  create,
  remove,
}


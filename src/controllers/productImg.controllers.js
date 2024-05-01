const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');
const fs = require('fs');
const path = require('path');

const getAll = catchError(async (req, res) => {
  const results = await ProductImg.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const url = req.protocol + "://" + req.headers.host + "/uploads/" + req.file.filename;

  //req.protocol -> http || https
  //req.headers.host -> localhost:8080
  //req.file.filename; -> boca.jpg

  //http://localhost:8080/uploads/boca.jpg

  const filename = req.file.filename;
  const result = await ProductImg.create({ url, filename });
  return res.status(201).json(result);
});


const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const image = await ProductImg.findByPk(id);
  if (!image) return res.sendStatus(404);

  fs.unlinkSync(path.join(__dirname, '..', 'public', 'uploads', image.filename));
  await image.destroy();
  return res.sendStatus(204);
});


module.exports = {
  getAll,
  create,
  remove,
}
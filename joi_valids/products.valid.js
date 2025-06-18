const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  image: Joi.string().uri(),
  price: Joi.number().positive(),
  quantity: Joi.number().integer().min(0),
  user_id: Joi.number().integer()
});

module.exports = productSchema;

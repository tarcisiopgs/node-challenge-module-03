const Joi = require('joi')

module.exports = {
  params: {
    id: Joi.string().required()
  },
  body: {
    buyer: Joi.string().required()
  }
}

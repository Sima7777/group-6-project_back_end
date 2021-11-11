const { Schema, model } = require('mongoose')
const Joi = require('joi')

const sessionSchema = new Schema({
  uid: {
    type: String,
  }
})

const joiSessionSchema = Joi.object({
  uid: Joi.string()
})

const Session = model('session', sessionSchema)

module.exports = {
  Session,
  joiSessionSchema,
}

const { model, Schema } = require('mongoose')
const PLM = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    firstname: String,
    surname: String,
    email: String,
    role: {
      type: String,
      enum: ['ADMIN', 'SALESREP'],
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

userSchema.plugin(PLM, { usernameField: 'email' })

module.exports = model('User', userSchema)

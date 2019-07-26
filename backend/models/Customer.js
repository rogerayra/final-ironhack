const { model, Schema } = require('mongoose')

customerSchema = new Schema(
  {
    name: String,
    sector: {
      type: String,
      enum: ['auto', 'aero', 'molde', 'meca', 'ener']
    },
    address: String,
    salesRep: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: [Number]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = model('Customer', customerSchema)

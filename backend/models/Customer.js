const { model, Schema } = require('mongoose')

customerSchema = new Schema(
  {
    name: String,
    sector: {
      type: String,
      enum: ['Automóvil', 'Aeronáutica', 'Molde / Matriz', 'Mecanizado General', 'Energía']
    },
    address: String,
    salesRep: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'GeoArea'
    },
    state: {
      type: Schema.Types.ObjectId,
      ref: 'GeoArea'
    },
    province: {
      type: Schema.Types.ObjectId,
      ref: 'GeoArea'
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

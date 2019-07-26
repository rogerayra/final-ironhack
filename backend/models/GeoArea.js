const { model, Schema } = require('mongoose')

geoAreaSchema = new Schema(
  {
    name: String,
    category: {
      type: String,
      enum: ['ccaa', 'prov', 'maqComercial']
    },
    address: String,
    salesRep: {
      type: Schema.Types.ObjectId,
      ref: 'SaleRep'
    },
    location: {
      type: {
        type: String,
        enum: ['Polygon']
      },
      coordinates: [[[Number]]]
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = model('GeoArea', geoAreaSchema)

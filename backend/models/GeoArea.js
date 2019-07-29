const { model, Schema } = require('mongoose')

geoAreaSchema = new Schema(
  {
    name: String,
    category: {
      type: String,
      enum: ['country', 'state', 'province']
    },
    subareas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'GeoArea'
      }
    ],
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: [Number]
    }
    // location: {
    //   type: {
    //     type: String,
    //     enum: ['Polygon']
    //   },s
    //   coordinates: [[[Number]]]
    // }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = model('GeoArea', geoAreaSchema)

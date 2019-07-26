const { model, Schema } = require('mongoose')

visitSchema = new Schema(
  {
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    },
    purpose: String,
    status: {
      type: String,
      enum: ['pending', 'pendingReport', 'cancelled', 'completed'],
      default: 'pending'
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = model('Visit', visitSchema)

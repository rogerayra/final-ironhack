const GeoArea = require('../models/GeoArea')

exports.getAllStates = async (req, res, next) => {
  try {
    const states = await GeoArea.find({ category: 'state' }, { name: 1, subareas: 1, category: 1 }).populate({
      path: 'subareas',
      select: 'name category'
    })
    res.status(200).json({ states })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

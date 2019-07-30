const GeoArea = require('../models/GeoArea')

exports.getAllCountries = async (req, res, next) => {
  try {
    const geoareas = await GeoArea.find({ category: 'country' })
    res.status(200).json({ geoareas })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.getAllStates = async (req, res, next) => {
  try {
    const geoareas = await GeoArea.find({ category: 'state' }, { name: 1, subareas: 1, category: 1 }).populate({
      path: 'subareas',
      select: 'name category'
    })
    res.status(200).json({ geoareas })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.getAllProvinces = async (req, res, next) => {
  try {
    const geoareas = await GeoArea.find({ category: 'province' })
    res.status(200).json({ geoareas })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

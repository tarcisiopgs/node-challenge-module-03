const Ad = require('../models/Ad')
const User = require('../models/User')

class PurchaseSellController {
  async index (req, res) {
    const { buyer } = req.body
    const { id } = req.params

    const user = await User.findById(buyer)

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const ad = await Ad.findById(id)

    if (!ad) {
      return res.status(400).json({ error: 'Ad not found' })
    }

    const adUpdated = await Ad.findByIdAndUpdate(id, { purchasedBy: buyer }, {
      new: true
    })

    return res.json(adUpdated)
  }
}

module.exports = new PurchaseSellController()

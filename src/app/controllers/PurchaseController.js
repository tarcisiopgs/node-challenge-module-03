const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async index (req, res) {
    const purchases = await Purchase.find()

    return res.json(purchases)
  }

  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    if (purchaseAd.purchasedBy) {
      return res.status(400).json({ error: 'Ad finished. Item selled.' })
    }

    await Purchase.create(req.body)

    Queue.create(PurchaseMail.key, { ad: purchaseAd, user, content }).save()

    return res.send()
  }
}

module.exports = new PurchaseController()

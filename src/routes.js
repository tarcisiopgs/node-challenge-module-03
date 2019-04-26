const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post('/users', validate(validators.User), handle(controllers.UserController.store))
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store))

routes.use(authMiddleware)

/**
 * Users
 * @type {Router}
 */
routes.get('/users', handle(controllers.UserController.index))

/**
 * Ads
 * @type {Router}
 */
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post('/ads', validate(validators.Ad), handle(controllers.AdController.store))
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchases
 * @type {Router}
 */
routes.get('/purchases', handle(controllers.PurchaseController.index))
routes.post('/purchases', validate(validators.Purchase), handle(controllers.PurchaseController.store))
routes.post('/purchases/:id/sell', validate(validators.PurchaseSell), handle(controllers.PurchaseSellController.index))

module.exports = routes

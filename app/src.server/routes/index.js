/**
 * Routes By LancerComet at 22:08, 2015.10.08.
 * # Carry Your World #
 * ---
 * Router.
 *
 * Changelog:
 * ---
 * V0.3.0 @ 1:11, 2017.01.13.
 *  - New update.
 */

const express = require('express')
const router = express.Router()
const apiRouter = express.Router()
const controllers = require('../controllers')

// API router.
// Prefix: /api/v2/
apiRouter.get('/change-log', controllers.changeLog)
apiRouter.get('/greeting-bg', controllers.bgUrl)
apiRouter.post('/search/:site', controllers.search)

// Router registration.
router.get('/', controllers.index)
router.use('/api/v2/', apiRouter)

// 404-to-index redirection.
router.get('*', controllers.index)

module.exports = router

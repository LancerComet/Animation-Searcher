/**
 * Routes By LancerComet at 22:08, 2015.10.08.
 * # Carry Your World #
 * ---
 * 路由引用文件.
 * 
 * Changelog:
 * ---
 * V0.3.0 @ 1:11, 2017.01.13.
 *  - New update.
 */
    
const express = require('express')
const router = express.Router()

const controllers = require('../controllers')

router.get('/', controllers.index)
router.post('/api/v2/search/:site', controllers.search)
router.get('/api/v2/change-log', controllers.changeLog)

// 404-to-index redirection.
router.get('*', controllers.index)

module.exports = router

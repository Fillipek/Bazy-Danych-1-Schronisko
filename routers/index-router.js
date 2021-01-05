const { Router } = require('express');

const controller = require('../controllers/index-controller');

const router = Router();

router.get('/', controller.render);

module.exports = router;
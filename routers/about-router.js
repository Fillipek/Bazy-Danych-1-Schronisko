const { Router } = require('express');
const controller = require('../controllers/about-controller');

const router = Router();
router.get('/', controller.render);
module.exports = router;
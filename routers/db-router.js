const { Router } = require('express');
const controller = require('../controllers/db-controller');

const router = Router();
router.get('/', controller.selectZwierzeta);
module.exports = router;
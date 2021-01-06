const { Router } = require('express');
const controller = require('../controllers/db-controller');

const router = Router();
router.get('/zwierzeta', controller.selectZwierzeta);
router.get('/personel', controller.selectPersonel);
module.exports = router;
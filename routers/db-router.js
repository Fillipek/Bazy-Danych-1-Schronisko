const { Router } = require('express');
const controller = require('../controllers/db-controller');

const router = Router();
router.get('/zwierzeta', controller.selectZwierzeta);
router.get('/personel', controller.selectPersonel);
router.get('/zwierzeta_info', controller.selectWpisy);
router.get('/pawilony', controller.selectPawilony);
router.get('/boksy', controller.selectBoksy);
router.get('/magazyn', controller.selectMagazyn);
module.exports = router;
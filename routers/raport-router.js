const { Router } = require('express');
const controller = require('../controllers/raport-controller');

const router = Router();
router.get('/pawilony_boksy', controller.raportPawilonyBoksy);
router.get('/do_adopcji', controller.raportDoAdopcji);
router.get('/personel', controller.raportPersonel);
module.exports = router;
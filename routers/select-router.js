const { Router } = require('express');
const controller = require('../controllers/select-controller');

const router = Router();

router.get('/boksy', controller.selectBoksy);
router.get('/klienci', controller.selectKlienci);
router.get('/magazyn', controller.selectMagazyn);
router.get('/pawilony', controller.selectPawilony);
router.get('/personel', controller.selectPersonel);
router.get('/zwierzeta', controller.selectZwierzeta);
router.get('/zwierzeta_info', controller.selectWpisy);
router.get('/personel_to_pawilony', controller.selectPersonelToPawilony);
router.get('/zapotrzebowanie', controller.selectZapotrzebowanie);
router.get('/kontrahenci', controller.selectKontrahenci);
router.get('/zamowienia', controller.selectZamowienia);
module.exports = router;
const { Router } = require('express');
const controller = require('../controllers/select-controller');
const insert = require('../controllers/post-insert-controller')

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

router.post('/pawilony', insert.pawilony);
router.post('/boksy', insert.boksy);
router.post('/klienci', insert.klienci);
router.post('/magazyn', insert.magazyn);
router.post('/zapotrzebowanie', insert.zapotrzebowanie);
router.post('/kontrahenci', insert.kontrahenci);
router.post('/zamowienia', insert.zamowienia);
router.post('/personel', insert.personel);
router.post('/personel_to_pawilony', insert.personelToPawilony);
router.post('/zwierzeta', insert.zwierzeta);
router.post('/zwierzeta_info', insert.zwierzetaInfo);

module.exports = router;
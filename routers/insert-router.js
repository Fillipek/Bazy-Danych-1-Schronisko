const { Router } = require('express');

const controller = require('../controllers/insert-controller');

const router = Router();

router.get('/pawilony', controller.pawilony);
router.get('/boksy', controller.boksy);
router.get('/klienci', controller.klienci);
router.get('/magazyn', controller.magazyn);
router.get('/zapotrzebowanie', controller.zapotrzebowanie);
router.get('/kontrahenci', controller.kontrahenci);
router.get('/zamowienia', controller.zamowienia);
router.get('/personel', controller.personel);
router.get('/personel_to_pawilony', controller.personelToPawilony);
router.get('/zwierzeta', controller.zwierzeta);
router.get('/zwierzeta_info', controller.zwierzetaInfo);


module.exports = router;
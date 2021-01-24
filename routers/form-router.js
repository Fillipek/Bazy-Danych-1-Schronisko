const { Router } = require('express');

const newAnimalController = require('../controllers/new-animal');
const adoptAnimalController = require('../controllers/animal-apoting');
const orderFinalizaotr = require('../controllers/order-finalizator');
const itemWithdrawer = require('../controllers/item-withdrawer');

const router = Router();

router.get('/new_animal', newAnimalController.showForm);
router.post('/new_animal', newAnimalController.postForm);

router.get('/adopt_animal', adoptAnimalController.showAvailableAnimals);
router.post('/adopt_animal/page_2', adoptAnimalController.showOrInsertClient);
router.post('/adopt_animal/finish', adoptAnimalController.finalizeForm);

router.get('/finalize_orders', orderFinalizaotr.showUnfinalizedOrders);
router.post('/finalize_orders', orderFinalizaotr.finalizeOrder);

router.get('/withdraw_items', itemWithdrawer.showItems);
router.post('/withdraw_items', itemWithdrawer.withdraw);

module.exports = router;
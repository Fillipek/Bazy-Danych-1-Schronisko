const { Router } = require('express');

const newAnimalController = require('../controllers/new-animal');
const adoptAnimalController = require('../controllers/adopt-animal');

const router = Router();

router.get('/new_animal', newAnimalController.showForm);
router.post('/new_animal', newAnimalController.postForm);

router.get('/adopt_animal', adoptAnimalController.pageSelectAnimal);
router.post('/adopt_animal/page_2', adoptAnimalController.pageSelectClient);
router.post('/adopt_animal/finish', adoptAnimalController.postForm);

module.exports = router;
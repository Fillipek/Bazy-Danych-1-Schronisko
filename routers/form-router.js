const { Router } = require('express');

const controller = require('../controllers/new-animal');

const router = Router();

router.get('/new_animal', controller.showForm);
router.post('/new_animal', controller.postForm);

module.exports = router;
const express = require('express');
const CardController = require('../controllers/cardController');

const router = express.Router();

router.post('/addCard', CardController.addCard);
router.get('/getCardList', CardController.getCardList);
router.get('/getCardDetail/:id', CardController.getCardDetail);
router.post('/setPIN/:id', CardController.setPin);
router.post('/blockCard/:id', CardController.blockCard);
router.post('/deleteCard/:id', CardController.deleteCard);

module.exports = router;
const CardService = require('../services/cardService');

class CardController {
  async addCard(req, res) {
    try {
      const { card_number, cardholder_name, expiry_date, pin_code } = req.body;
      const user_id = req.user.id;
      const cardData = { card_number, cardholder_name, expiry_date, user_id };
      const cardDetailData = { pin_code };
      const newCard = await CardService.addCard(cardData, cardDetailData);
      res.status(201).json(newCard);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getCardList(req, res) {
    try {
      const user_id = req.user.id;
      const cards = await CardService.getUserCards(user_id);
      res.status(200).json(cards);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getCardDetail(req, res) {
    try {
      const user_id = req.user.id;
      const card_id = req.params.id;
      const card = await CardService.getCardDetail(user_id, card_id);
      if (!card) {
        return res.status(404).json({ message: 'Card not found' });
      }
      res.status(200).json(card);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async setPin(req, res) {
    try {
      const card_id = req.params.id;
      const { pin } = req.body;
      await CardService.setPin(card_id, pin);
      res.status(200).json({ message: 'PIN updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async blockCard(req, res) {
    try {
      const card_id = req.params.id;
      await CardService.blockCard(card_id);
      res.status(200).json({ message: 'Card blocked successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteCard(req, res) {
    try {
      const card_id = req.params.id;
      await CardService.deleteCard(card_id);
      res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CardController();

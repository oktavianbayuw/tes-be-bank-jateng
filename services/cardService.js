const CardRepository = require('../repositories/cardRepository');

class CardService {
  async addCard(cardData, cardDetailData) {
    return await CardRepository.createCard(cardData, cardDetailData);
  }

  async getUserCards(userId) {
    return await CardRepository.getCardsByUserId(userId);
  }

  async getCardDetail(userId, cardId) {
    return await CardRepository.getCardByIdAndUserId(cardId, userId);
  }

  async setPin(cardId, pin) {
    return await CardRepository.updateCardPin(cardId, pin);
  }

  async deleteCard(cardId) {
    return await CardRepository.deleteCard(cardId);
  }

  async blockCard(cardId) {
    return await CardRepository.blockCard(cardId);
  }
}

module.exports = new CardService();

const Card = require('../models/card');
const CardDetail = require('../models/cardDetail');

class CardRepository {
  async createCard(cardData, cardDetailData) {
    const card = await Card.create(cardData);
    cardDetailData.card_id = card.id;
    await CardDetail.create(cardDetailData);
    return card;
  }

  async getCardsByUserId(userId) {
    return await Card.findAll({
      where: { user_id: userId },
      include: [{ model: CardDetail, as: 'detail' }]
    });
  }

  async getCardByIdAndUserId(cardId, userId) {
    return await Card.findOne({
      where: { id: cardId, user_id: userId },
      include: [{ model: CardDetail, as: 'detail' }]
    });
  }

  async updateCardPin(cardId, pin) {
    return await CardDetail.update(
      { pin_code: pin },
      { where: { card_id: cardId } }
    );
  }

  async deleteCard(cardId) {
    return await Card.destroy({ where: { id: cardId } });
  }

  async blockCard(cardId) {
    return await CardDetail.update(
      { blocked: true },
      { where: { card_id: cardId } }
    );
  }
}

module.exports = new CardRepository();

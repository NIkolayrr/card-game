import {ICardState} from './interfaces';
import {initialState, randomiseCards} from './utils';

export const cardsReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'addCards':
      return {
        ...state,
        mode: action.mode,
        cards: action.cards,
        rows: action.rows,
      };
    case 'setCurrentCard':
      const {cards, selectedCards} = state;
      const updatedCards = cards.map((card: ICardState) =>
        card.id === action.card.id ? {...card, selected: true} : card,
      );

      return {
        ...state,
        cards: updatedCards,
        currentCard: action.card.id,
        selectedCards: selectedCards + 1,
      };
    case 'setGuessedCards': {
      const {cards, ...restState} = state;
      const updateCard = (cardId: String) => ({
        ...cards.find((card: ICardState) => card.id === cardId),
        guessed: true,
      });

      const updatedCards = cards.map((card: ICardState) =>
        card.id === action.firstCard || card.id === action.secondCard
          ? updateCard(card.id)
          : card,
      );

      return {
        ...restState,
        cards: updatedCards,
        currentCard: undefined,
        selectedCards: 0,
      };
    }

    case 'removeSelectedCards': {
      const {cards} = state;
      const updatedCards = cards.map((card: ICardState) => ({
        ...card,
        selected: false,
      }));

      return {
        ...state,
        cards: updatedCards,
        currentCard: undefined,
        selectedCards: 0,
      };
    }
    case 'replayGame': {
      const {cards} = state;
      const updateCards = cards.map((card: ICardState) => ({
        ...card,
        guessed: false,
        selected: false,
      }));

      return {
        ...state,
        cards: randomiseCards(updateCards),
        currentCard: undefined,
        selectedCards: 0,
      };
    }
    case 'resetGame': {
      return {...initialState};
    }
    default:
      throw Error('Unknown action.');
  }
};

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
      const cardsCopy = state.cards;
      cardsCopy.filter((card: ICardState) => {
        if (card.id === action.card.id) {
          card.selected = true;
        }
      });
      return {
        ...state,
        cards: [...cardsCopy],
        currentCard: action.card.id,
        selectedCards: (state.selectedCards += 1),
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
      const cardsCopy = state.cards;
      cardsCopy.filter((card: ICardState) => (card.selected = false));
      return {
        ...state,
        cards: [...cardsCopy],
        currentCard: undefined,
        selectedCards: 0,
      };
    }
    case 'replayGame': {
      const cardsCopy = state.cards;
      cardsCopy.filter((card: any) => {
        (card.guessed = false), (card.selected = false);
      });

      return {
        ...state,
        cards: [...randomiseCards(cardsCopy)],
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

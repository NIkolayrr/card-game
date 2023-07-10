import {ICardState} from './interfaces';

export const generateCards = (images: any) => {
  const cards: Array<ICardState> = [];
  images.map((img: any, index: number) => {
    cards.push({
      image: img.image,
      id: `${index}_original`,
      guessed: false,
      selected: false,
    });
    cards.push({
      image: img.image,
      id: `${index}_copy`,
      guessed: false,
      selected: false,
    });
  });

  return randomiseCards(cards);
};

export const randomiseCards = (cards: Array<ICardState>) => {
  return cards
    .map((value: any) => ({value, sort: Math.random()}))
    .sort((a: any, b: any) => a.sort - b.sort)
    .map(({value}: any) => value);
};

export const initialState = {
  mode: undefined,
  cards: [],
  currentCard: undefined,
  selectedCards: 0,
  rows: 2,
};

export const CARD_TIMEOUT = 2000; // in milliseconds

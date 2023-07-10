export interface ICardState {
  image: any;
  id: String;
  guessed: Boolean;
  selected: Boolean;
}

export interface ICard {
  state: any;
  onPress: () => void;
  card: ICardState;
  style: any;
}

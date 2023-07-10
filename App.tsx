import React, {useReducer} from 'react';
import {Button, Image, SafeAreaView, StyleSheet, Text} from 'react-native';
import {DifficultyScreen} from './DifficultyScreen';
import {cardsReducer} from './services/cardsReducer';
import {GameScreen} from './GameScreen';
import {CARD_TIMEOUT, initialState} from './services/utils';
import {ICardState} from './services/interfaces';
import YaraLogo from './images/tileImages/09_YaraPrideLogo.png';

const App = () => {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  const handleCardPress = (card: ICardState) => () => {
    if (
      card.id === state.currentCard ||
      state.selectedCards > 1 ||
      card.guessed
    ) {
      return;
    }

    dispatch({
      type: 'setCurrentCard',
      card: card,
    });

    const nextCardId = card.id.split('_')[0];
    const currentCardId = state.currentCard?.split('_')[0];

    if (nextCardId === currentCardId) {
      dispatch({
        type: 'setGuessedCards',
        firstCard: state.currentCard,
        secondCard: card.id,
      });
    }

    if (currentCardId && currentCardId !== nextCardId) {
      setTimeout(() => {
        dispatch({
          type: 'removeSelectedCards',
        });
      }, CARD_TIMEOUT);
    }
  };

  const handleReplayPress = () => {
    dispatch({
      type: 'replayGame',
    });
  };

  const handleChangeDifficultyPress = () => {
    dispatch({
      type: 'resetGame',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={YaraLogo} style={styles.logo} />
      <Text style={styles.title}>Yara Memory Game</Text>
      {!state.mode && <DifficultyScreen dispatch={dispatch} />}
      {state.mode && (
        <>
          <Button
            title="Select Difficulty"
            onPress={handleChangeDifficultyPress}
          />
          <GameScreen
            state={state}
            handleCardPress={handleCardPress}
            handleReplayPress={handleReplayPress}
          />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {width: 75, height: 75, alignSelf: 'center', margin: 10},
  container: {flex: 1, backgroundColor: '#ccc'},
  title: {
    alignSelf: 'center',
    fontSize: 25,
    marginVertical: 10,
  },
});

export default App;

import React from 'react';
import {Button, ScrollView, Dimensions, StyleSheet} from 'react-native';
import {Card} from './components/Card';

export const GameScreen = ({
  state,
  handleCardPress,
  handleReplayPress,
}: any) => {
  const deviceWidth = Dimensions.get('window').width;
  const cardWidth = (deviceWidth - 100) / state.rows;
  return (
    <>
      <Button title="New Game" onPress={handleReplayPress} />
      <ScrollView contentContainerStyle={styles.containerStyle}>
        {state.cards &&
          state.cards.map((card: any, index: number) => (
            <Card
              state={state}
              key={index}
              card={card}
              onPress={handleCardPress(card)}
              style={{width: cardWidth}}
            />
          ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 20,
  },
});

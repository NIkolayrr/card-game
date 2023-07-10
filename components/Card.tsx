import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ICard} from '../services/interfaces';

export const Card = ({state, onPress, card, style, ...props}: ICard) => {
  const isCardVisible =
    state.currentCard === card?.id || card?.guessed || card?.selected;
  return (
    <TouchableOpacity
      style={{...style, ...styles.container}}
      onPress={onPress}
      {...props}>
      <Image
        style={{
          ...styles.imageStyle,
          opacity: isCardVisible ? 1 : 0,
        }}
        source={card.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    overflow: 'hidden',
    padding: 5,
    backgroundColor: 'white',
  },
  imageStyle: {
    width: '100%',
    height: 100,
  },
});

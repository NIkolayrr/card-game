import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {generateCards} from './services/utils';
import {images as YaraImages} from './images';

export const DifficultyScreen = ({dispatch}: any) => {
  const setLevel = (level: string) => () => {
    switch (level) {
      case 'easy':
        dispatch({
          type: 'addCards',
          cards: generateCards(YaraImages.slice(0, 4)),
          mode: 'easy',
          rows: 2,
        });
        break;
      case 'medium':
        dispatch({
          type: 'addCards',
          cards: generateCards(YaraImages.slice(0, 6)),
          mode: 'medium',
          rows: 3,
        });
        break;
      case 'hard':
        dispatch({
          type: 'addCards',
          cards: generateCards(YaraImages),
          mode: 'hard',
          rows: 4,
        });
        break;
    }
  };
  return (
    <View style={styles.containerStyle}>
      <View>
        <TouchableOpacity style={styles.buttonStyle} onPress={setLevel('easy')}>
          <Text style={styles.text}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={setLevel('medium')}>
          <Text style={styles.text}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={setLevel('hard')}>
          <Text style={styles.text}>Hard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonStyle: {
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    width: 200,
    backgroundColor: 'white',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: 20,
  },
});

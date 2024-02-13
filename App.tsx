/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from './src/components/Button';

const indexes: Array<[number, number]> = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

function App(): React.JSX.Element {
  // tictactoe
  // who is playing?
  const [player, setPlayer] = useState('Player 1');
  const [won, setWon] = useState('');
  // what are the options?
  const [options, setOptions] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [reload, setReload] = useState(false);
  // which option is selected?
  const selectAnOption = (indexes: [number, number]) => {
    if (reload) {
      setReload(false);
    }
    console.log('indexes:', indexes);
    const selectedOption = options[indexes[0]][indexes[1]];
    console.log('selectedOption:', selectedOption);
    if (selectedOption === '') {
      let newOptions = options;
      if (player === 'Player 1') {
        newOptions[indexes[0]][indexes[1]] = 'X';
      } else {
        newOptions[indexes[0]][indexes[1]] = 'O';
      }
      setOptions(newOptions);
    }
    console.log(player);
    checkWin();
    console.log('Option updated after click!', options);
  };
  // did you won?
  const checkHorizontally = (): boolean => {
    let flag = false;
    for (let row = 0; row < options.length; row++) {
      let line = options[row];
      if (line[0] && line[1] && line[2])
        if (line[0] === line[1] && line[1] === line[2]) flag = true;
    }
    return flag;
  };
  const checkVertically = () => {
    let flag = false;
    for (let column = 0; column < options.length; column++) {
      if (options[0][column] && options[1][column] && options[2][column])
        if (
          options[0][column] === options[1][column] &&
          options[1][column] === options[2][column]
        )
          flag = true;
    }
    return flag;
  };
  const checkDiagonally = () => {
    let flag = false;
    if (options[0][0] === options[1][1] && options[1][1] == options[2][2]) {
      if (options[0][0] && options[1][1] && options[2][2]) flag = true;
    } else if (
      options[0][2] === options[1][1] &&
      options[1][1] === options[2][0]
    ) {
      if (options[0][2] && options[1][1] && options[2][0]) flag = true;
    }
    return flag;
  };
  const checkWin = () => {
    console.log('checked horizontally:', checkHorizontally());
    console.log('checked vertically:', checkVertically());
    console.log('checked diagonally:', checkDiagonally());
    if (checkHorizontally() || checkVertically() || checkDiagonally()) {
      setWon(player);
    }
  };

  const handleReload = () => {
    setWon('');
    setOptions([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setReload(true);
    setPlayer('Player 1');
    console.log('Options ', options);
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.headerContainer}>
              {won && (
                <Text style={[styles.headerText, {color: '#8BE78B'}]}>
                  {won} won the game
                </Text>
              )}
              {!won && (
                <Text style={styles.headerText}>{player} is playing...</Text>
              )}
            </View>
            <View style={styles.bodyWrapper}>
              <View style={styles.bodyContainer}>
                {indexes.map((item, index) => (
                  <Button
                    key={index}
                    player={player}
                    setPlayer={setPlayer}
                    index={item}
                    selectAnOption={selectAnOption}
                    finish={!!won}
                    reload={reload}
                  />
                ))}
              </View>
            </View>
            <Pressable
              style={[
                styles.headerContainer,
                {
                  backgroundColor: '#62D2E2',
                },
              ]}
              onPress={handleReload}>
              <Text style={styles.headerText}>Reload</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: '80%',
  },
  container: {
    borderColor: 'red',
    height: Dimensions.get('window').height,
    padding: 15,
    // rowGap: 10,
    justifyContent: 'center',
  },
  headerContainer: {
    backgroundColor: '#EA5B5F',
    height: 60,
    justifyContent: 'center',
    borderRadius: 20,
    // textAlign: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  bodyContainer: {
    height: '80%',
    // borderWidth: 1,
    borderColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 5,
    // justifyContent: 'center',
    rowGap: 5,
  },
  bodyWrapper: {
    // height: '90%',
    justifyContent: 'center',
    // borderWidth: 1,
    borderColor: 'red',
  },
});

export default App;

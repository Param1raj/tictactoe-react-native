import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {PropsWithChildren, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { Icon } from 'react-native-vector-icons/';

type ButtonPropsType = PropsWithChildren<{
  player: string;
  setPlayer: (player: React.SetStateAction<string>) => void;
  index: [number, number];
  selectAnOption: (index: [number, number]) => void;
  finish: boolean;
  reload: boolean;
}>;

const Button = ({
  player,
  setPlayer,
  index,
  selectAnOption,
  finish,
  reload,
}: ButtonPropsType) => {
  const iconStyls = {fontSize: 20};
  const [selected, setSelected] = useState(false);
  const [icon, setIcon] = useState(
    <Icon name="pencil-alt" style={iconStyls} />,
  );
  const handlePress = () => {
    selectAnOption(index);
    if (player === 'Player 1') {
      setIcon(
        <Icon name="times-circle" style={{color: '#EA5B5F', fontSize: 50}} />,
      );
      setPlayer('Player 2');
    }
    if (player === 'Player 2') {
      setIcon(<Icon name="circle" style={{color: '#62D2E2', fontSize: 50}} />);
      setPlayer('Player 1');
    }
    setSelected(true);
  };

  useEffect(() => {
    if (reload) {
      setSelected(false);
      setIcon(<Icon name="pencil-alt" style={iconStyls} />);
    }
  }, [reload]);
  return (
    <Pressable
      style={[
        {
          width: '32%',
          height: '32%',
          justifyContent: 'center',
          alignItems: 'center',
          // borderWidth: 1,
          borderColor: '#B1BEC6',
          // borderRadius: 20,
          flexGrow: 1,
          shadowColor: '#B1BEC6',
          shadowOffset: {width: 1, height: 3},
          shadowOpacity: 0.3,
          shadowRadius: 2,
          elevation: 4,
        },
        styles.container,
      ]}
      onPress={() => {
        if (!selected) {
          handlePress();
        }
      }}
      disabled={finish}>
      <Text>{icon}</Text>
      {/* </Pressable> */}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    // borderRadius: 10,
  },
});

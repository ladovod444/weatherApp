import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/*<Text style={styles.text}>Привет!!</Text>*/}
      {/*<Text style={styles.text}>Привет!!</Text>*/}

      {/*<StatusBar style="auto" />*/}
      <View style={styles.yellowView}>
        {/*<Text>Привет желтый</Text>*/}
      </View>
      <View style={styles.blueView} >
        {/*<Text>Привет синий</Text>*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'row',
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  yellowView: {
    flex: 1,
    backgroundColor: 'yellow'
  },
  blueView: {
    flex: 5,
    backgroundColor: 'blue'
  },
  text: {
    fontSize: 28,
    color: 'white',
    //width: '100%'
  }
});

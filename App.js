import * as React from 'react';
import {Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {useState, useEffect} from "react";
import * as Location from "expo-location";
import axios from "axios";
import Loading from "./Loading";
import Weather from "./Weather";
import Map from "./Map";

const API_KEY = '24751568ed46291e1768e5f7fbbd2508';


function App() {

  const [isLoading, setLoading] = useState(true);
  const [temp, setTemp] = useState();
  const [condition, setCondition] = useState();

  const getLocation = async () => {
    try {
      //throw Error();
      //const response = await Location.getForegroundPermissionsAsync();
      const response = await Location.requestPermissionsAsync();
      if (response.status === "denied") {
        console.log('Не могу определить местоположение')
      }

      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();
      await getWeather(latitude, longitude);
      //const api_key = '1394c004909a73d450495a3a07e518ff';
      // TODO Сделать запрос к API
      console.log(latitude)
      console.log(longitude)

    } catch (error) {
      //Alert.alert('Не могу определить местоположение', 'Очень грустно :(');
      alert('Не могу определить местоположение!!!');
    }

  }

  const getWeather = async (latitude, longitude) => {
    const weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    const {data: {main: {temp}, weather}} = await axios.get(weather_api_url);
    // this.setState({
    //   isLoading: false, temp: temp, condition: weather[0].main
    // })

    console.log('temp=', temp)
    console.log('temp=', temp)
    console.log('condition=/', weather[0].main)

    setTemp(temp);
    setCondition(weather[0].main);
    setLoading(false);

  }


  function WeatherScreen({ navigation }) {
    return (       isLoading  ? <Loading /> :
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Maps"
          onPress={() => navigation.navigate('Maps')}
        />
        <Button title="Go to More" onPress={() => navigation.navigate('More')} />

        {console.log('log cond=', condition)}
        <Weather temp={Math.round(temp)} condition={condition} />
      </View>

    );
  }

  function MapScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Maps... again"
          onPress={() => navigation.push('Details')}
        />
        <Button title="Go to Weather" onPress={() => navigation.navigate('Home')} />
        <Button title="Go to More" onPress={() => navigation.navigate('More')} />
        <Button title="Go back" onPress={() => navigation.goBack()} />

        <Map />
      </View>
    );
  }

  function MoreScreen({navigation}) {
    return (<View>
      <Text>More text</Text>
      <Button
        title="Go to Maps"
        onPress={() => navigation.push('Details')}
      />
      <Button title="Go to Weather" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>)
  }

  const Stack = createStackNavigator();

  useEffect(() => {
    getLocation();
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={WeatherScreen} />
        <Stack.Screen name="Maps" component={MapScreen} />
        <Stack.Screen name="More" component={MoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

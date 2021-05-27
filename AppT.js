import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Loading from "./Loading";
import {Alert} from "react-native-web";

import axios from "axios";
import Weather from "./Weather";

const API_KEY = '24751568ed46291e1768e5f7fbbd2508';

export default class extends React.Component {

  state = {
    isLoading: true,

  };

  getWeather = async (latitude, longitude) => {
    const weather_api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`

    const {data: {main: {temp}, weather}} = await axios.get(weather_api_url);
    //const condition = 'Clear';
    this.setState({
      isLoading: false, temp: temp, condition: weather[0].main
    })
    //console.log(data)
  }

  getLocation = async () => {

    try {
      //throw Error();
      //const response = await Location.getForegroundPermissionsAsync();
      const response = await Location.requestPermissionsAsync();
      //console.log('response', response)
      //console.log(response.status)

      //alert('Failed to get push token for push notification!');

      // Alert.alert(
      //   'Alert Title',
      //   'My Alert Msg',
      //   [
      //     { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
      //     {
      //       text: 'Cancel',
      //       onPress: () => console.log('Cancel Pressed'),
      //       style: 'cancel',
      //     },
      //     { text: 'OK', onPress: () => console.log('OK Pressed') },
      //   ],
      //   { cancelable: false }
      // );

      if (response.status === "denied") {
        ///Alert.alert('Не могу определить местоположение', 'Очень грустно :(');

        //alert('Не могу определить местоположение', 'Очень грустно :(');
        
        console.log('Не могу определить местоположение')
      }

      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();

      this.getWeather(latitude, longitude);

      //const api_key = '1394c004909a73d450495a3a07e518ff';


      //console.log(weather_api_url)

      // fetch(weather_api_url)
      //   .then(response => {
      //     console.log(response)
      //   return response.json();
      // })
      //   .then(data => {
      //     console.log(data);
      //   });

      //console.log('coords lat', coords.latitude);
      //console.log('coords lng', coords.longitude);

      // TODO Сделать запрос к API

      console.log(latitude)
      console.log(longitude)

    } catch (error) {
      //Alert.alert('Не могу определить местоположение', 'Очень грустно :(');
      alert('Не могу определить местоположение!!!');
    }

  }


  componentDidMount() {
    this.getLocation();
  }

  render () {
    const {isLoading, temp, condition} = this.state;
    return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}


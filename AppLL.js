import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Loading from "./Loading";
import LoadingMap from "./LoadingMap";
import {Alert} from "react-native-web";

import axios from "axios";
import Weather from "./Weather";

//import PizzaTranslator from './PizzaTranslator'
//import Battery from './Battery'
import Map from "./Map";

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
      if (response.status === "denied") {
        ///Alert.alert('Не могу определить местоположение', 'Очень грустно :(');
        //alert('Не могу определить местоположение', 'Очень грустно :(');

        console.log('Не могу определить местоположение')
      }

      const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();

      this.getWeather(latitude, longitude);

      //const api_key = '1394c004909a73d450495a3a07e518ff';

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
    return ( isLoading ? <LoadingMap />: <>
      <Map />
      </>
    );
  }
}


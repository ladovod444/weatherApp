import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {Alert} from "react-native-web";

export default function LoadingMap() {

	const testAlert = () => {
		Alert.alert('Не могу определить местоположение', 'Очень грустно :(');
	}


	return <View style={styles.container}>
		<StatusBar barStyle="dark-content" />
		<Text style={styles.text}>Получение данных...!</Text>
	</View>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		paddingHorizontal: 30,
		paddingVertical: 100,
		backgroundColor: '#FDF6AA'
	},
	text: {
		color: '#2c2c2c',
		fontSize: 30
	}
})
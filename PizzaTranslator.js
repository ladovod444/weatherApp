import React, { useState } from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const PizzaTranslator = () => {
	const [text, setText] = useState('');
	return (
		<View style={{padding: 10}}>
			<TextInput
				style={styles.text}
				placeholder="Type here to translate!"
				onChangeText={text => setText(text)}
				defaultValue={text}
			/>
			<Text style={{padding: 10, fontSize: 42}}>
				{text.split(' ').map((word) => word && '🍕').join(' ')}
			</Text>
		</View>
	);
}

export default PizzaTranslator;

const styles = StyleSheet.create({
	text: {
		color: 'red',
		height: 40,
		margin: 12,
		borderWidth: 1,
	}
})
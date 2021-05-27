import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { Marker } from 'react-native-maps';
import axios from "axios";
import {useState, useEffect} from "react";

export default function Map() {

	const [mapData, setMapData] = useState([]);

	const[loading, setLoading] = useState(true);

	useEffect(() => {
		const data = getMarkers();
		// getMarkers().then((response) => {
		// 	console.log(mapData);
		// })

    if (mapData.length) {
			console.log('mapData= ', mapData)
		}



	},[])

	const mapClick = () => {
		alert('Map Click')
	}

	const mapPress = () => {
		alert('Map press')
	}

	const pressMarker = () => {
		alert('Marker pressed')
	}

	const getMarkers = async () => {
		//const markers_url = 'http://ws2.docksal/jsonapi/node/sale_point';
		//const markers_url = 'https://localdelivery.market/jsonapi/node/sale_point';
		const markers_url = 'https://map.designseonweb.com/jsonapi/node/sale_point';
		const {data: {data: data}} = await axios(markers_url);

		console.log('data', data)

		setMapData(data);
		setLoading(false);

		//return data;

	}





	const markers = [
		{
			latlng: {
				latitude: 48.469065,
				longitude: 38.797475,
			},
			title: 'Some title',
			description: 'Some descr',
		},
		{
			latlng: {
				latitude: 48.469065,
				longitude: 38.799475,
			},
			title: 'Some title2',
			description: 'Some descr2',
		}
	]

	return (
		<View style={styles.container}>
			{loading ?
				<Text>LOADING</Text> : <View>
				<Text> {console.log(mapData)} DATA!!!!</Text>



					<MapView
							initialRegion={{
								// latitude: 48.469065,
								// longitude: 38.797475,
								latitude: 43.684345,
								longitude: -79.431292,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							}}
							onPress={mapPress} onPoiClick={mapClick} style={styles.map} >

						{mapData.map((marker, index) => (
							<Marker
								key={index}
								coordinate={{latitude: marker.attributes.field_location.lat, longitude: marker.attributes.field_location.lng}}
								title={marker.attributes.title}
								description='Some descr'
								onPress={pressMarker}
							/>
						))}
						</MapView>

					</View>
			}



			{/*<MapView*/}
			{/*	initialRegion={{*/}
			{/*		latitude: 48.469065,*/}
			{/*		longitude: 38.797475,*/}
			{/*		latitudeDelta: 0.0922,*/}
			{/*		longitudeDelta: 0.0421,*/}
			{/*	}}*/}
			{/*	onPress={mapPress} onPoiClick={mapClick} style={styles.map} >*/}

			{/*{markers.map((marker, index) => (*/}
			{/*	<Marker*/}
			{/*		key={index}*/}
			{/*		coordinate={marker.latlng}*/}
			{/*		title={marker.title}*/}
			{/*		description={marker.description}*/}
			{/*		onPress={pressMarker}*/}
			{/*	/>*/}
			{/*))}*/}
			{/*</MapView>*/}

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
});
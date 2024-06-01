import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const Map = () => {
	const [mapRegion, setMapRegion] = useState({
		latitude: 44.131,
		longitude: -111.1111,
		latitudeDelta: 0.09133,
		longitudeDelta: 0.0422,
	});
	const [errorMsg, setErrorMsg] = useState(null);

	const userLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission denied.");
			return;
		}

		let location = await Location.getCurrentPositionAsync({
			enableHighAccuracy: true,
		});
		setMapRegion({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.09133,
			longitudeDelta: 0.0422,
		});
	};

	useEffect(() => {
		userLocation();

		const locationWatcher = Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.High,
				timeInterval: 1000,
				distanceInterval: 100,
			},
			(location) => {
				setMapRegion({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.09133,
					longitudeDelta: 0.0422,
				});
				console.log(
					"Long: ",
					location.coords.longitude,
					"Latti : ",
					location.coords.latitude
				);
			}
		);

		return () => {
			locationWatcher.then((watcher) => watcher.remove());
		};
	}, []);

	return (
		<View style={styles.container}>
			<MapView style={styles.map} region={mapRegion}>
				<Marker coordinate={mapRegion} title="Marker" />
			</MapView>
			{errorMsg ? <Text>{errorMsg}</Text> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'grey',
		overflow: 'hidden',
		alignItems: 'center',
		justifyContent: 'center',

	},
	map: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		saspectRatio: 16 / 9,
		borderRadius: 10,
		height: '60%'
	},
});

export default Map;
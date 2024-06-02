import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const GOOGLE_PLACES_API_KEY = "AIzaSyAQKFbgLqW8T7gteciqegLunAhS0tUZzkY";

const Map = () => {
	const [mapRegion, setMapRegion] = useState({
		latitude: 44.131,
		longitude: -111.1111,
		latitudeDelta: 0.09133,
		longitudeDelta: 0.0422,
	});
	const [errorMsg, setErrorMsg] = useState(null);
	const [initialFetchDone, setInitialFetchDone] = useState(false);

	const userLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			setErrorMsg("Permission denied.");
			return;
		}

		let location = await Location.getCurrentPositionAsync({
			enableHighAccuracy: true,
		});
		const currentRegion = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.09133,
			longitudeDelta: 0.0422,
		};
		setMapRegion(currentRegion);

		if (!initialFetchDone) {
			fetchNearbyRestaurants(currentRegion.latitude, currentRegion.longitude);
			setInitialFetchDone(true);
		}
	};

	const fetchNearbyRestaurants = async (latitude, longitude) => {
		const requestBody = {
			includedTypes: ["restaurant"],
			maxResultCount: 5,
			locationRestriction: {
				circle: {
					center: {
						latitude,
						longitude,
					},
					radius: 2000.0, // 5 km radius
				},
			},
		};

		console.log("Request Body:", JSON.stringify(requestBody));

		try {
			const response = await fetch(
				"https://places.googleapis.com/v1/places:searchNearby",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
						"X-Goog-FieldMask":
							"places.displayName,places.formattedAddress,places.types,places.location",
					},
					body: JSON.stringify(requestBody),
				}
			);

			console.log("Response Status:", response.status);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`HTTP error! status: ${response.status}, response: ${errorText}`
				);
			}

			const data = await response.json();
			console.log("Places:", data.places);
		} catch (error) {
			console.error("Error fetching nearby restaurants:", error);
		}
	};

	useEffect(() => {
		userLocation();

		const locationWatcher = Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.High,
				timeInterval: 5000,
				distanceInterval: 10,
			},
			(location) => {
				const currentRegion = {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.09133,
					longitudeDelta: 0.0422,
				};
				setMapRegion(currentRegion);

				fetchNearbyRestaurants(currentRegion.latitude, currentRegion.longitude);
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
		backgroundColor: "grey",
		overflow: "hidden",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		...StyleSheet.absoluteFillObject,
		width: "100%",
		saspectRatio: 16 / 9,
		borderRadius: 10,
		height: "60%",
	},
});

export default Map;

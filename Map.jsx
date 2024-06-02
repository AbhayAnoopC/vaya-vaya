import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useSelector , useDispatch} from 'react-redux';
const GOOGLE_PLACES_API_KEY = "AIzaSyAQKFbgLqW8T7gteciqegLunAhS0tUZzkY";
import { ref, child, get } from 'firebase/database';
import { db } from './FirebaseConfig'; // Assuming you have configured Firebase
import { setPlaces } from "./slices/navSlice";

const Map = () => {
	const [mapRegion, setMapRegion] = useState({
		latitude: 44.131,
		longitude: -111.1111,
		latitudeDelta: 0.09133,
		longitudeDelta: 0.0422,
	});
	const [errorMsg, setErrorMsg] = useState(null);
	const [initialFetchDone, setInitialFetchDone] = useState(false);

	const user = useSelector(state => state.nav.user);
	const dispatch = useDispatch();
	const [julepUser, setJulepUser] = useState("");

  // Accessing the uid from the user object
  const uid = user ? user.uid : null;
  console.log(uid)

  const [age, setAge] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
	const fetchAge = async () => {
	  try {
		const userRef = ref(db, `users/${uid}/julepUserId`); // Reference to the 'age' data for the user
		const snapshot = await get(userRef);
  
		if (snapshot.exists()) {
		  // If data exists for the user, log the age
		  const age = snapshot.val();
		  console.log("Age:", age);
		  setJulepUser(age);
		} else {
		  // Handle case where data doesn't exist
		  console.log("No age data found for the user");
		}
	  } catch (error) {
		// Handle error
		console.error("Error fetching age:", error);
	  } finally {
		setLoading(false);
	  }
	};
  
	if (uid) {
	  fetchAge();
	}
  }, [uid]);
  

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
			includedTypes: ["restaurant", ],
			maxResultCount: 4,
			locationRestriction: {
				circle: {
					center: {
						latitude,
						longitude,
					},
					radius: 5000.0, // 5 km radius
				},
			},
		};

		// console.log("Request Body:", JSON.stringify(requestBody));

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

			// console.log("Response Status:", response.status);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`HTTP error! status: ${response.status}, response: ${errorText}`
				);
			}

			const data = await response.json();
			console.log("Places:", data.places);
			dispatch(setPlaces(data.places));
			console.log("yoyoyo")


			// const rec = await chat();
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



////////////////////////////////////////////////////////////////
// const API_KEY =
// 		"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmQ1M2ZlZC1jMmY3LTRkNDAtYjEyMC04YmUwZGNhYTkyZDEiLCJlbWFpbCI6InJ1c2hhYW4uY2hhd2xhQGdtYWlsLmNvbSIsImlhdCI6MTcxNzEzMDExMCwiZXhwaXJlc0luIjoiMXkiLCJyYXRlTGltaXRQZXJNaW51dGUiOjM1MDAsInF1b3RhUmVzZXQiOiIxaCIsImNsaWVudEVudmlyb25tZW50Ijoic2VydmVyIiwic2VydmVyRW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwidmVyc2lvbiI6InYwLjIiLCJleHAiOjE3NDg2ODc3MTB9.00eHvdV4xZSLaZL-VkGZnihYDeNbIIGxa0r8rS8_CSUJ6HmEBJByDLERcUbRrwxh20zq1jAWh29s5tYxBBFOcg";

// 	// JULEP AI METHODS

// 	const JULEP_ENDPOINT = "https://api-alpha.julep.ai";
// 	const JULEP_API_KEY =
// 		"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmQ1M2ZlZC1jMmY3LTRkNDAtYjEyMC04YmUwZGNhYTkyZDEiLCJlbWFpbCI6InJ1c2hhYW4uY2hhd2xhQGdtYWlsLmNvbSIsImlhdCI6MTcxNzEzMDExMCwiZXhwaXJlc0luIjoiMXkiLCJyYXRlTGltaXRQZXJNaW51dGUiOjM1MDAsInF1b3RhUmVzZXQiOiIxaCIsImNsaWVudEVudmlyb25tZW50Ijoic2VydmVyIiwic2VydmVyRW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwidmVyc2lvbiI6InYwLjIiLCJleHAiOjE3NDg2ODc3MTB9.00eHvdV4xZSLaZL-VkGZnihYDeNbIIGxa0r8rS8_CSUJ6HmEBJByDLERcUbRrwxh20zq1jAWh29s5tYxBBFOcg";
// 	const AGENT_NAME = "food-recommender";
// 	const SESSION_NAME = "default-session";

// async function chat(settings = {}, restaurantJson) {
		
// 	//Make agent
// 	const metadata = { name: SESSION_NAME };
// 	// const metadataFilter = JSON.stringify(metadata);
// 	const agentRes = await fetch("https://api-alpha.julep.ai/api/agents", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${API_KEY}`,
// 		},
// 		body: JSON.stringify({
// 			name: AGENT_NAME,
// 			model: "gpt-4o",
// 			about:
// 				"You are a food blogger who has won many awards; 'Best Food Recommender', 'Best Food Blogger 2023' and etc. You always recommend the best restuarants to dine at. You are an expert at considering each person's situation, likes and preferences and recommend them restuarants",
// 			instruction: [
// 				`You're tasked with providing restaurant recommendations based on a person's preferences and demographic factors. You will be provided with most of those details. Following are the details to consider:
// 	  Person's Preferences:
// 	  Cuisines Liked: A list of cuisines the person enjoys.
// 	  Cuisines Not Liked: A list of cuisines the person dislikes.
// 	  Age: The person's age, which influences dietary preferences. Younger individuals might prefer fast food or trendy options, while older individuals may lean towards healthier choices.
// 	  Allergies: Any food allergies the person has.
// 	  Price Range: The person's comfort level with restaurant prices, indicated from $ (lowest) to $$$$ (highest).
// 	  Dietary Restrictions: Any specific dietary restrictions the person follows, such as vegetarian, vegan, gluten-free, etc.
// 	  Demographic Factors:
// 	  Age Influence: Consider how age affects food preferences. For instance, younger individuals may have a higher tolerance for fried foods, while older individuals may prefer healthier options.
// 	  Allergy Sensitivity: Be mindful of any allergies listed, ensuring the recommended restaurants accommodate these restrictions.
// 	  Price Range Alignment: Align restaurant choices with the person's indicated price range comfort level.
// 	  Dietary Preferences: Take into account the person's dietary restrictions to ensure the recommended restaurants offer suitable options.
// 	  JSON Data for Restaurants will be given in future chats.
// 	  Your task is to provide a recommendation for the top restaurant choice based on the person's preferences and demographic factors. If the choice isn't optimal, return "none". You can provide up to two restaurant recommendations, given as an array.`,
// 			],
// 			metadata: metadata,
// 		}),
// 	});
// 	const agentData = await agentRes.json();
// 	//Make session
// 	const sessionRes = await fetch("https://api-alpha.julep.ai/api/sessions", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: `Bearer ${API_KEY}`,
// 		},
// 		body: JSON.stringify({
// 			agent_id: agentData.items[0].id,
// 			user_id: julepUser, //user.julepUserId //"2b7a08b0-9021-4318-bd28-2028db079b66"
// 			metadata,
// 			situation:
// 				"you are a food blogger who has won many awards and you always recommend the best restuarants to dine at. I always want the response to be only restraunts name, if any",
// 		}),
// 	});
// 	const sessionData = await sessionRes.json();
// 	//Call chat

// 	const chatRes = await fetch(
// 		"https://api-alpha.julep.ai/api/sessions/${sessionData.id}/chat",
// 		{
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization:`Bearer ${API_KEY}`,
// 			},
// 			body: JSON.stringify({
// 				messages: [
// 					{
// 						content: [{"displayName": {"languageCode": "en", "text": "Tim Hortons"}, "formattedAddress": "3990 Shelbourne St, Victoria, BC V8N 3E2, Canada", "location": {"latitude": 48.4720073, "longitude": -123.33298359999999}, "types": ["coffee_shop", "breakfast_restaurant", "bakery", "fast_food_restaurant", "cafe", "store", "restaurant", "point_of_interest", "food", "establishment"]}, {"displayName": {"languageCode": "en", "text": "Domino's Pizza"}, "formattedAddress": "4083 Shelbourne St, Victoria, BC V8N 5Y1, Canada", "location": {"latitude": 48.476774, "longitude": -123.33234460000001}, "types": ["pizza_restaurant", "meal_delivery", "meal_takeaway", "restaurant", "point_of_interest", "food", "establishment"]}, {"displayName": {"languageCode": "en", "text": "The Village"}, "formattedAddress": "4087 Shelbourne St, Victoria, BC V8N 4P6, Canada", "location": {"latitude": 48.476791899999995, "longitude": -123.3323985}, "types": ["breakfast_restaurant", "restaurant", "point_of_interest", "food", "establishment"]}, {"displayName": {"languageCode": "en", "text": "Lee's House Restaurant李家小馆(Order From Our Website, Delivery Start From 0.99$)"}, "formattedAddress": "3994 Shelbourne St, Victoria, BC V8N 3E2, Canada", "location": {"latitude": 48.471969699999995, "longitude": -123.33357930000001}, "types": ["chinese_restaurant", "cafe", "restaurant", "point_of_interest", "food", "establishment"]}, {"displayName": {"languageCode": "en", "text": "Snowy Village Victoria"}, "formattedAddress": "4071 Shelbourne St #2A, Victoria, BC V8N 5Y1, Canada", "location": {"latitude": 48.4764032, "longitude": -123.33239409999999}, "types": ["restaurant", "point_of_interest", "food", "establishment"]}],
// 						role: "user",
// 					},
// 				],
// 			}),
// 		}
// 	);
// 	const chatData = await chatRes.json();

// 	// const response = await makeRequest(
// 	// 	"POST",
// 	// 	/api/sessions/${session.id}/chat,
// 	// 	{ restaurantJson, ...settings }
// 	// );
// 	console.log("THIS IS IT: ", chatData.response[0]);
// 	return chatData.response[0];
// }








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

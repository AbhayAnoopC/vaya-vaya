// import React, { useState } from "react";
// import { View, StyleSheet, Button, Text } from "react-native";
// import CuisineClickable from "./CuisineClickable";
// import { useSelector, useDispatch } from "react-redux";
// import {
// 	selectUser,
// 	setLikes,
// 	selectLikes,
// 	setDislikes,
// } from "../slices/navSlice";
// import { getDatabase, ref, set } from "firebase/database";
// import { db } from "../FirebaseConfig";

// const cuisines = [
// 	"Italian",
// 	"Chinese",
// 	"Mexican",
// 	"Indian",
// 	"Thai",
// 	"French",
// 	"Peruvian",
// 	"American",
// 	"British",
// 	"Japanese",
// ];

// const CuisineGrid = ({ navigation }) => {
// 	const [cuisineLikeDict, setCuisineLikeDict] = useState({
// 		Italian: false,
// 		Chinese: false,
// 		Mexican: false,
// 		Indian: false,
// 		Thai: false,
// 		French: false,
// 		Peruvian: false,
// 		American: false,
// 		British: false,
// 		Japanese: false,
// 	});
// 	const [cuisineDislikeDict, setCuisineDislikeDict] = useState({
// 		Italian: false,
// 		Chinese: false,
// 		Mexican: false,
// 		Indian: false,
// 		Thai: false,
// 		French: false,
// 		Peruvian: false,
// 		American: false,
// 		British: false,
// 		Japanese: false,
// 	});
// 	const user = useSelector(selectUser);
// 	const dispatch = useDispatch();
// 	const likes = useSelector(selectLikes);

// 	const toggleSelection = (cuisine, setCuisineDict) => {
// 		setCuisineDict((prevState) => ({
// 			...prevState,
// 			[cuisine]: !prevState[cuisine], // Toggle the value of the specified cuisine
// 		}));
// 	};

// 	const savePreferences = async () => {
// 		const likesD = Object.keys(cuisineLikeDict).filter(
// 			(key) => cuisineLikeDict[key]
// 		);
// 		const dislikesD = Object.keys(cuisineDislikeDict).filter(
// 			(key) => cuisineDislikeDict[key]
// 		);
// 		if (likesD.length < 3 || dislikesD.length < 3) {
// 			alert("Need at least 3 of each cuisine!");
// 		} else {
// 			console.log(user.uid);
// 			dispatch(setLikes({ likes: likesD }));
// 			dispatch(setDislikes({ dislikes: dislikesD }));
// 			await set(ref(db, "users/" + user.uid), {
// 				likes: likesD,
// 				dislikes: dislikesD,
// 			});
// 			console.log("These are the final likes: ", likesD);
// 			console.log("These are the final dislikes: ", dislikesD);
// 			navigation.navigate("Inside");
// 			navigation.navigate("Inside");
// 		}
// 	};

// 	return (
// 		<View style={styles.grid}>
// 			<Text>Select at least 3 cuisines you enjoy</Text>
// 			{cuisines.map((cuisine) => (
// 				<CuisineClickable
// 					key={cuisine}
// 					text={cuisine}
// 					isSelected={cuisineLikeDict[cuisine]}
// 					toggleSelection={() => toggleSelection(cuisine, setCuisineLikeDict)}
// 				/>
// 			))}
// 			<Text>Select at least 3 cuisines you detest</Text>
// 			{cuisines.map((cuisine) => (
// 				<CuisineClickable
// 					key={cuisine}
// 					text={cuisine}
// 					isSelected={cuisineDislikeDict[cuisine]}
// 					toggleSelection={() =>
// 						toggleSelection(cuisine, setCuisineDislikeDict)
// 					}
// 				/>
// 			))}
// 			<Button title="Confirm" onPress={savePreferences} />
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	grid: {
// flexDirection: "row",
// flexWrap: "wrap",
// justifyContent: "center",
// 	},
// });

// export default CuisineGrid;

import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Button,
	Text,
	TextInput,
	ScrollView,
} from "react-native";
import CuisineClickable from "./CuisineClickable";
import { useSelector, useDispatch } from "react-redux";
import {
	selectUser,
	setLikes,
	selectLikes,
	setDislikes,
} from "../slices/navSlice";
import { getDatabase, ref, set } from "firebase/database";
import { db } from "../FirebaseConfig";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";

const cuisines = [
	"Italian",
	"Chinese",
	"Mexican",
	"Indian",
	"Thai",
	"French",
	"Peruvian",
	"American",
	"British",
	"Japanese",
];

const CuisineGrid = ({ navigation }) => {
	const [cuisineLikeDict, setCuisineLikeDict] = useState({
		Italian: false,
		Chinese: false,
		Mexican: false,
		Indian: false,
		Thai: false,
		French: false,
		Peruvian: false,
		American: false,
		British: false,
		Japanese: false,
	});
	const [cuisineDislikeDict, setCuisineDislikeDict] = useState({
		Italian: false,
		Chinese: false,
		Mexican: false,
		Indian: false,
		Thai: false,
		French: false,
		Peruvian: false,
		American: false,
		British: false,
		Japanese: false,
	});
	const [priceRangeDict, setPriceRangeDict] = useState({
		$: false,
		$$: false,
		$$$: false,
		$$$$: false,
	});
	const [age, setAge] = useState("");
	const [allergies, setAllergies] = useState("");
	const [priceRange, setPriceRange] = useState("");
	const [dietaryRestrictions, setDietaryRestrictions] = useState("");
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const likes = useSelector(selectLikes);

	const toggleSelection = (cuisine, setCuisineDict) => {
		setCuisineDict((prevState) => ({
			...prevState,
			[cuisine]: !prevState[cuisine], // Toggle the value of the specified cuisine
		}));
	};

	const savePreferences = async () => {
		const likesD = Object.keys(cuisineLikeDict).filter(
			(key) => cuisineLikeDict[key]
		);
		const dislikesD = Object.keys(cuisineDislikeDict).filter(
			(key) => cuisineDislikeDict[key]
		);
		const priceRangeD = Object.keys(priceRangeDict).filter(
			(key) => priceRangeDict[key]
		);
		if (likesD.length < 3 || dislikesD.length < 3) {
			alert("Need at least 3 of each cuisine!");
		} else if (priceRangeD.length < 1) {
			alert("Need at least one price preference");
		} else {
			console.log(user.uid);
			dispatch(setLikes({ likes: likesD }));
			dispatch(setDislikes({ dislikes: dislikesD }));
			await set(ref(db, "users/" + user.uid), {
				likes: likesD,
				dislikes: dislikesD,
				age,
				allergies,
				priceRange: priceRangeD,
				dietaryRestrictions,
			});
			console.log("These are the final likes: ", likesD);
			console.log("These are the final dislikes: ", dislikesD);
			navigation.navigate("Inside");
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollViewContent}>
			<KeyboardAvoidingView>
				<View style={styles.grid}>
					<Text>Select at least 3 cuisines you enjoy</Text>
					{cuisines.map((cuisine) => (
						<CuisineClickable
							key={cuisine}
							text={cuisine}
							isSelected={cuisineLikeDict[cuisine]}
							toggleSelection={() =>
								toggleSelection(cuisine, setCuisineLikeDict)
							}
						/>
					))}
					<Text>Select at least 3 cuisines you detest</Text>
					{cuisines.map((cuisine) => (
						<CuisineClickable
							key={cuisine}
							text={cuisine}
							isSelected={cuisineDislikeDict[cuisine]}
							toggleSelection={() =>
								toggleSelection(cuisine, setCuisineDislikeDict)
							}
						/>
					))}
					<Text>Age</Text>
					<TextInput
						style={styles.input}
						onChangeText={setAge}
						value={age}
						placeholder="Enter your age"
						keyboardType="numeric"
					/>
					<Text>Allergies</Text>
					<TextInput
						style={styles.input}
						onChangeText={setAllergies}
						value={allergies}
						placeholder="Enter your allergies (separated by commas)"
					/>
					<Text>Price range</Text>
					{["$", "$$", "$$$", "$$$$"].map((price) => (
						<CuisineClickable
							key={price}
							text={price}
							isSelected={priceRangeDict[price]}
							toggleSelection={() => toggleSelection(price, setPriceRangeDict)}
						/>
					))}
					<Text>Dietary Restrictions</Text>
					<TextInput
						style={styles.input}
						onChangeText={setDietaryRestrictions}
						value={dietaryRestrictions}
						placeholder="Enter your dietary restrictions (separated by commas)"
					/>
					<Button title="Confirm" onPress={savePreferences} />
				</View>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	grid: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		height: 40,
		width: 200,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
	},
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CuisineGrid;

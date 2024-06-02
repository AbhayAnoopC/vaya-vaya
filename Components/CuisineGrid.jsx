import React, { useState } from "react";
import {
	View,
	StyleSheet,
	TouchableOpacity,
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
import tw from "twrnc";

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
	const [dietaryRestrictions, setDietaryRestrictions] = useState("");
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const API_KEY =
		"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmQ1M2ZlZC1jMmY3LTRkNDAtYjEyMC04YmUwZGNhYTkyZDEiLCJlbWFpbCI6InJ1c2hhYW4uY2hhd2xhQGdtYWlsLmNvbSIsImlhdCI6MTcxNzEzMDExMCwiZXhwaXJlc0luIjoiMXkiLCJyYXRlTGltaXRQZXJNaW51dGUiOjM1MDAsInF1b3RhUmVzZXQiOiIxaCIsImNsaWVudEVudmlyb25tZW50Ijoic2VydmVyIiwic2VydmVyRW52aXJvbm1lbnQiOiJwcm9kdWN0aW9uIiwidmVyc2lvbiI6InYwLjIiLCJleHAiOjE3NDg2ODc3MTB9.00eHvdV4xZSLaZL-VkGZnihYDeNbIIGxa0r8rS8_CSUJ6HmEBJByDLERcUbRrwxh20zq1jAWh29s5tYxBBFOcg";
	const createUserAboutStr = () => {
		const likesD = Object.keys(cuisineLikeDict).filter(
			(key) => cuisineLikeDict[key]
		);
		const dislikesD = Object.keys(cuisineDislikeDict).filter(
			(key) => cuisineDislikeDict[key]
		);
		const priceRangeD = Object.keys(priceRangeDict).filter(
			(key) => priceRangeDict[key]
		);

		let str = "An individual that ";

		let likesNoEnd = "likes these cuisines: ";
		likesD.forEach((cuisine) => (likesNoEnd += `${cuisine},`));
		let likes = likesNoEnd.substring(0, likesNoEnd.length - 1) + ".";

		let dislikesNoEnd = "They dislike these cuisines: ";
		dislikesD.forEach((cuisine) => (dislikesNoEnd += `${cuisine},`));
		let dislikes = dislikesNoEnd.substring(0, dislikesNoEnd.length - 1) + ".";

		let priceRangeNoEnd = "They prefer these price ranges: ";
		priceRangeD.forEach((price) => (priceRangeNoEnd += `${price},`));
		let priceRange =
			priceRangeNoEnd.substring(0, priceRangeNoEnd.length - 1) + ".";

		str += `${likes} ${dislikes} ${priceRange}`;
		if (age.length > 0) {
			str += ` They are ${age} years old.`;
		}

		if (allergies.length > 0) {
			str += ` They have these allergies: ${allergies}`;
		}

		if (dietaryRestrictions.length > 0) {
			str += ` They have these dietary restrictions: ${dietaryRestrictions}`;
		}
		console.log("This is the about string: ", str);
		return str;
	};

	const createJulepUser = async () => {
		const response = await fetch("https://api-alpha.julep.ai/api/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY}`,
			},
			body: JSON.stringify({ name: user.email, about: createUserAboutStr() }),
		});
		const data = await response.json();
		console.log("This is the id in create method: ", data);
		return data.id;
	};

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
			const julepUserId = await createJulepUser();
			dispatch(setLikes({ likes: likesD }));
			dispatch(setDislikes({ dislikes: dislikesD }));
			console.log("This is the Julep User Id in save: ", julepUserId);
			await set(ref(db, "users/" + user.uid), {
				likes: likesD,
				dislikes: dislikesD,
				age,
				allergies,
				priceRange: priceRangeD,
				dietaryRestrictions,
				julepUserId,
			});
			// console.log("These are the final likes: ", likesD);
			// console.log("These are the final dislikes: ", dislikesD);
			navigation.navigate("Inside");
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollViewContent}>
			<KeyboardAvoidingView>
				<View style={tw` w-82 my-20`}>
					<Text>Tell Us more About You</Text>
					<Text style={tw`text-lg font-bold mt-8`}>Select at least 3 cuisines you enjoy</Text>
					<View style={tw`flex flex-row flex-wrap justify-around py-6`}>
					{cuisines.map((cuisine) => (
						<CuisineClickable
							key={cuisine}
							text={cuisine}
							isSelected={cuisineLikeDict[cuisine]}
							toggleSelection={() =>{
								console.log("click")
								toggleSelection(cuisine, setCuisineLikeDict)}
							}
						/>

					))}
					</View>
					{/* <Button onPress={fetchListofUsers} title="Test" /> */}
					<Text  style={tw`text-lg font-bold`}>Select at least 3 cuisines you detest</Text>
					<View style={tw`flex flex-row flex-wrap justify-around py-6`}>
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
					</View>
					<Text  style={tw`text-lg font-bold`}>Age</Text>
					<TextInput
						style={tw`bg-slate-200 w-36 h-12 text-center`}
						onChangeText={setAge}
						value={age}
						placeholder=""
						keyboardType="numeric"
					/>
					<Text  style={tw`text-lg font-bold pt-6`}>Allergies</Text>
					<TextInput
						style={tw`bg-slate-200 w-80 h-24 pl-4`}
						onChangeText={setAllergies}
						value={allergies}
						placeholder="Dairy, Peanuts ..."
					/>
					<Text  style={tw`text-lg font-bold pt-6`}>Price range</Text>
					<View style={tw`flex flex-row flex-wrap justify-around py-6`}>
					{["$", "$$", "$$$", "$$$$"].map((price) => (
						<CuisineClickable
							key={price}
							text={price}
							isSelected={priceRangeDict[price]}
							toggleSelection={() => toggleSelection(price, setPriceRangeDict)}
						/>
					))}</View>
					<Text style={tw`text-lg font-bold pt-6`}>Dietary Restrictions</Text>
					<TextInput
						style={tw`bg-slate-200 w-80 h-24 pl-4`}
						onChangeText={setDietaryRestrictions}
						value={dietaryRestrictions}
						placeholder="Enter Dislikes"
					/>
					<TouchableOpacity style={[tw`bg-black mt-6 rounded-lg justify-between  text-center h-12 w-78`, styles.button]} onPress={savePreferences}>
      						<Text style={tw`px-5 py-3 text-md justify-center text-center text-white`}>Confirm</Text>
    				</TouchableOpacity>
					{/* <Button title="Confirm" onPress={savePreferences} /> */}
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

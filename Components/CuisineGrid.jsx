import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import CuisineClickable from "./CuisineClickable";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setLikes, selectLikes } from "../slices/navSlice";
import { getDatabase, ref, set } from "firebase/database";
import { db } from "../FirebaseConfig";

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
	const [selected, setSelected] = useState([]);
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
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const likes = useSelector(selectLikes);
	const toggleSelection = (cuisine) => {
		setCuisineLikeDict((prevState) => ({
			...prevState,
			[cuisine]: !prevState[cuisine], // Toggle the value of the specified cuisine
		}));
	};

	const saveLikes = async () => {
		const likesD = Object.keys(cuisineLikeDict).filter(
			(key) => cuisineLikeDict[key]
		);
		if (likesD.length < 3) {
			alert("Need at least 3 likes!");
		} else {
			console.log(user.uid);
			dispatch(setLikes({ likes: likesD }));
			await set(ref(db, "users/" + user.uid), {
				likes: likesD,
			});
			console.log("These are the final likes: ", likesD);
			navigation.navigate("Inside");
		}
	};

	return (
		<View style={styles.grid}>
			{cuisines.map((cuisine) => (
				<CuisineClickable
					key={cuisine}
					text={cuisine}
					isSelected={cuisineLikeDict[cuisine]}
					toggleSelection={() => toggleSelection(cuisine)}
				/>
			))}
			<Button title="Select Likes" onPress={saveLikes} />
		</View>
	);
};

const styles = StyleSheet.create({
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
});

export default CuisineGrid;

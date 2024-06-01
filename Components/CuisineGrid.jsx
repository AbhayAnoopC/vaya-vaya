import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import CuisineClickable from "./CuisineClickable";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setLikes, selectLikes } from "../slices/navSlice";

// const CuisineGrid = () => {
// 	const items = Array.from(
// 		{ length: 15 },
// 		(_, index) => `Hello World ${index + 1}`
// 	);

// 	return (
// 		<View style={styles.grid}>
// 			{items.map((item, index) => (
// 				<CuisineClickable key={index} text={item} />
// 			))}
// 		</View>
// 	);
// };

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

const CuisineGrid = ({ selectedLikes, setSelectedLikes }) => {
	const [selected, setSelected] = useState([]);
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const likes = useSelector(selectLikes);
	// if (!setSelectedLikes) {
	// 	console.error("setSelectedLikes is undefined");
	// }
	const toggleSelection = (cuisine) => {
		// console.log("I am in the Grid: ", user);
		setSelected((prevSelected) => {
			const isSelected = prevSelected && prevSelected.includes(cuisine);
			if (isSelected) {
				return prevSelected.filter((item) => item !== cuisine);
			} else {
				return [...prevSelected, cuisine];
			}
		});
		console.log(selected);
	};
	// React.useEffect(() => {
	// 	console.log("setSelectedLikes:", setSelectedLikes);
	// 	setSelectedLikes(selected);
	// 	if (typeof setSelectedLikes !== "function") {
	// 		console.error("setSelectedLikes is not a function");
	// 	}
	// }, [selected, setSelectedLikes]);

	const saveLikes = () => {
		dispatch(setLikes({ likes: selected }));
		console.log("These are the final likes: ", likes);
	};

	return (
		<View style={styles.grid}>
			{cuisines.map((cuisine) => (
				<CuisineClickable
					key={cuisine}
					text={cuisine}
					isSelected={selected && selected.includes(cuisine)}
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

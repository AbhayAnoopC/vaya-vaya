import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";


// const CuisineClickable = ({ text }) => {
// 	const [selected, setSelected] = useState(false);

// 	return (
// 		<TouchableOpacity
// 			style={[styles.oval, selected && styles.selectedOval]}
// 			onPress={() => setSelected(!selected)}
// 		>
// 			<Text style={styles.ovalText}>{text}</Text>
// 		</TouchableOpacity>
// 	);
// };

const CuisineClickable = ({ text, isSelected, toggleSelection }) => {
	return (
		<TouchableOpacity
			style={[styles.oval, isSelected && styles.selectedOval, isSelected ? styles.selectedText : styles.notselectedText]}
			onPress={toggleSelection}
		>
			<Text style={styles.ovalText}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	oval: {
		width: 100,
		height: 50,
		borderRadius: 25,
		borderWidth: 1,
		borderColor: "#000",
		justifyContent: "center",
		alignItems: "center",
		margin: 5,
	},
	selectedOval: {
		backgroundColor: "#B2B2B2",
	},
	selectedText: {
		color: "#FFFFFF",
	},
	notselectedText: {
		color: "#000000",
	},
});

export default CuisineClickable;

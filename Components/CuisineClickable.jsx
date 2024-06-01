import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const CuisineClickable = ({ text }) => {
	const [selected, setSelected] = useState(false);

	return (
		<TouchableOpacity
			style={[styles.oval, selected && styles.selectedOval]}
			onPress={() => setSelected(!selected)}
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
		borderColor: "#ccc",
		justifyContent: "center",
		alignItems: "center",
		margin: 5,
	},
	selectedOval: {
		backgroundColor: "blue",
	},
	ovalText: {
		color: "#000",
	},
});

export default CuisineClickable;

import React from "react";
import { View, StyleSheet } from "react-native";
import CuisineClickable from "./CuisineClickable";

const CuisineGrid = () => {
	const items = Array.from(
		{ length: 15 },
		(_, index) => `Hello World ${index + 1}`
	);

	return (
		<View style={styles.grid}>
			{items.map((item, index) => (
				<CuisineClickable key={index} text={item} />
			))}
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

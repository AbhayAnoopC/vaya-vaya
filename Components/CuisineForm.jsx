import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CuisineGrid from "./CuisineGrid";

const CuisineForm = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Cuisines</Text>
			<Text style={styles.subtitle}>Likes</Text>
			<CuisineGrid />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 16,
	},
	subtitle: {
		fontSize: 18,
		marginBottom: 16,
	},
});

export default CuisineForm;

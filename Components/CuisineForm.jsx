import React, { useState } from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import CuisineGrid from "./CuisineGrid";
import { getDatabase, ref, set } from "firebase/database";
import { FIREBASE_AUTH } from "../FirebaseConfig";

// const CuisineForm = () => {
// 	return (
// 		<View style={styles.container}>
// 			<Text style={styles.title}>Cuisines</Text>
// 			<Text style={styles.subtitle}>Likes</Text>
// 			<CuisineGrid />
// 			<Button>select likes</Button>
// 		</View>
// 	);
// };

const CuisineForm = ({ navigation, route }) => {
	const [selectedLikes, setSelectedLikes] = useState([]);
	const { user } = route.props

	const saveLikesToDatabase = async () => {
		const user = FIREBASE_AUTH.currentUser;
		if (user) {
			const sanitizedEmail = user.email.replace(/\./g, ',');
			const db = getDatabase();
			await set(ref(db, 'users/' + sanitizedEmail), {
				likes: selectedLikes
			});
			Alert.alert("Success", "Likes have been saved!");
			navigation.navigate("Inside"); // Navigate to another screen if needed
		} else {
			Alert.alert("Error", "User not authenticated!");
		}
	};

	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Text style={styles.title}>Cuisines</Text>
				<Text style={styles.subtitle}>Likes</Text>
				{<CuisineGrid selectedLikes={selectedLikes} setSelectedLikes={setSelectedLikes} user={user} />}
				<Button title="Select Likes" onPress={saveLikesToDatabase} />
			</View>
		</SafeAreaView>
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

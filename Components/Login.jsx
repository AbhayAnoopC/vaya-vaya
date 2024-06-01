import { View, Text, StyleSheet, ActivityIndicatorBase } from "react-native";
import React from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const auth = FIREBASE_AUTH;

	const signIn = async () => {
		setLoading(true);
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			console.log(response);
		} catch (error) {
			console.log(error);
			alert("Sign in failed: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	const signUp = async () => {
		setLoading(true);
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log(response);
			alert("Check your emails!");
		} catch (error) {
			console.log(error);
			alert("Sign up failed: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				value={email}
				style={styles.input}
				placeholder="Email"
				autoCapitalize="none"
				onChangeText={(text) => setEmail(text)}
			></TextInput>
			<TextInput
				secureTextEntry={true}
				value={password}
				style={styles.input}
				placeholder="Password"
				autoCapitalize="none"
				onChangeText={(text) => setPassword(text)}
			></TextInput>
			{loading ? (
				<ActivityIndicatorBase szie="large" />
			) : (
				<>
					<Button title="Login" onPress={() => {}}></Button>
					<Button title="Create account" onPress={() => {}}></Button>
				</>
			)}
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		flex: 1,
		justifyContent: "center",
	},
	inputs: {},
});

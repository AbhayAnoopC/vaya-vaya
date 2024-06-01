import {
	View,
	TextInput,
	Button,
	StyleSheet,
	ActivityIndicator,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Login = ({ navigation }) => {
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
			navigation.navigate("Cuisine");
		}
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<KeyboardAvoidingView
					style={styles.keyboardAvoidingView}
					behavior="padding"
				>
					<TextInput
						value={email}
						style={styles.inputs}
						placeholder="Email"
						autoCapitalize="none"
						onChangeText={(text) => setEmail(text)}
					></TextInput>
					<TextInput
						secureTextEntry={true}
						value={password}
						style={styles.inputs}
						placeholder="Password"
						autoCapitalize="none"
						onChangeText={(text) => setPassword(text)}
					></TextInput>
					{loading ? (
						<ActivityIndicator szie="large" color="#0000ff" />
					) : (
						<>
							<Button title="Login" onPress={signIn}></Button>
							<Button title="Create account" onPress={signUp}></Button>
						</>
					)}
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		flex: 1,
		justifyContent: "center",
	},
	keyboardAvoidingView: {
		flex: 1,
		justifyContent: "center",
	},
	inputs: {
		marginVertical: 4,
		height: 50,
		borderWidth: 1,
		borderRadius: 4,
		padding: 10,
		backgroundColor: "#fff",
	},
});

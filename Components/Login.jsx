import {
	View,
	TextInput,
	Button,
	StyleSheet,
	Text,
	ActivityIndicator,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getDatabase, ref, set } from "firebase/database";
import { db } from "../FirebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/navSlice";
import tw from 'twrnc';

const Stack = createNativeStackNavigator();

const Login = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	// const [user, setUser] = useState(null);
	const dispatch = useDispatch();
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
			navigation.navigate("Inside");
		}
	};

	const sanitizeEmail = (email) => {
		return email.replace(/\./g, ","); // fixing email coz apparently no . allowed in key
		//might be better to use unique id
	};

	const signUp = async () => {
		setLoading(true);
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			dispatch(
				setUser({
					displayName: response.user.displayName,
					email: response.user.email,
					uid: response.user.uid,
				})
			);
			setLoading(false);
			navigation.navigate("Cuisine");
		} catch (error) {
			console.log(error);
			alert("Sign up failed: " + error.message);
		} finally {
			setLoading(false);
		}
	};

	const createUserInDatabase = async (email) => {
		const sanitizedEmail = sanitizeEmail(email);
		await set(ref(db, "users/" + sanitizedEmail), {
			//likes: ["apples", "bananas", "carrots"]
		});
	};

	return (<>	

	<View style={tw`bg-slate-200 h-full`}>
	<Text style={tw`flex flex-col mt-36 tracking-8 py-24 font-black h-60 text-6xl text-black text-center align-center `}>
		VAYA
	</Text>
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<KeyboardAvoidingView
					style={styles.keyboardAvoidingView}
					behavior="padding"
				>
					<TextInput
						value={email}
						style={styles.inputs}
						placeholder="alexndra.chawla@gxmel.com"
						autoCapitalize="none"
						onChangeText={(text) => setEmail(text)}
					></TextInput>
					<TextInput
						secureTextEntry={true}
						value={password}
						style={styles.inputs}
						placeholder=" . . . . . ."
						autoCapitalize="none"
						onChangeText={(text) => setPassword(text)}
					></TextInput>
					{loading ? (
						<ActivityIndicator szie="large" color="#0000ff" />
					) : (
						<>
						<View style={tw`flex-row justify-center`}>
					<View style={tw`flex-col justify-between h-28 mt-8`}>	   
					<TouchableOpacity style={[tw`bg-black rounded-lg justify-between  text-center h-12 w-78`, styles.button]} onPress={signUp}>
      						<Text style={tw`px-5 py-3 text-md justify-center text-center text-white`}>Log In</Text>
    				</TouchableOpacity>
					<TouchableOpacity style={[tw`bg-black rounded-lg justify-between  text-center h-12 w-78`, styles.button]} onPress={signUp}>
      						<Text style={tw`px-5 py-3 text-md justify-center text-center text-white`}>Sign Up</Text>
    				</TouchableOpacity>
					</View></View>
					
							{/* <Button style={{ backgroundColor: 'black' }} title="Login" onPress={signIn}></Button>
							<Button title="Create account" onPress={signUp}></Button> */}
						
						</>
					)}
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback></View></>
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
		borderRadius: 8,
		padding: 10,
		backgroundColor: "#fff",
	},
});

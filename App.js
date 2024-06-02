import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import Swipe from "./Swipe.js";
import Login from "./Components/Login.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig.js";
import CuisineGrid from "./Components/CuisineGrid.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";


const Stack = createNativeStackNavigator();

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(FIREBASE_AUTH, (user) => {
			setUser(user);
		});
	}, []);
  
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login">
					{user ? (
						<>
							{console.log("Im in A")}
							<Stack.Screen
								name="Inside"
								component={Swipe}
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="Cuisine"
								component={CuisineGrid}
								options={{ headerShown: false }}
							/>
						</>
					) : (
						<>
							<Stack.Screen
								name="Login"
								component={Login}
								options={{ headerShown: false }}
							/>
							{console.log("Im in B")}

							<Stack.Screen
								name="Inside"
								component={Swipe}
								options={{ headerShown: false }}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    borderRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  map: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 20,
  },

});

export default App;

import React, { useState, useEffect, Component } from "react";
import { LogBox } from "react-native";
import Sidebar from "./Screens/Sidebar";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BoxBreathingScreen from "./Screens/BoxBreathingScreen";
import FourSevenEightBreathingScreen from "./Screens/FourSevenEightBreathingScreen";
import ResonanceBreathingScreen from "./Screens/ResonanceBreathingScreen";
import LotusPositionScreen from "./Screens/LotusPositionScreen";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA29O4ACBwb0pIIkL5dVZ6ognv_EwtyoJk",
  authDomain: "revyou-app.firebaseapp.com",
  projectId: "revyou-app",
  storageBucket: "revyou-app.appspot.com",
  messagingSenderId: "773132669573",
  appId: "1:773132669573:web:7febfc2adc93645c50cfec",
  measurementId: "G-NLS68DM70B",
};

// Suppresses AsyncStorage warning
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
]);

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login Screen"
              component={LoginScreen}
              gestureEnabled={false}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register Screen"
              component={RegisterScreen}
              gestureEnabled={false}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sidebar"
              component={Sidebar}
              gestureEnabled={false}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Box Breathing"
              component={BoxBreathingScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="4-7-8 Breathing"
              component={FourSevenEightBreathingScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="Resonance Breathing"
              component={ResonanceBreathingScreen}
            />
            <Stack.Screen
              name="Lotus Position"
              component={LotusPositionScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

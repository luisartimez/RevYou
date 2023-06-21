import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import ExercisesButton from "../components/ExercisesButton";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Exercises = ({ navigation }) => {
  return (
    <View style={styles.appContainer}>
      <ExercisesButton
        text="Box Breathing"
        subtitle="Breathe in cycle of 4 counts"
        onPress={() => navigation.navigate("Box Breathing")}
      />
      <ExercisesButton
        text="4-7-8 Breathing"
        subtitle="Can be performed in bed"
        onPress={() => navigation.navigate("4-7-8 Breathing")}
      />
      <ExercisesButton
        text="Lotus Position"
        subtitle="Designed to focus the mind"
        onPress={() => navigation.navigate("Lotus Position")}
      />
    </View>
  );
};

export default Exercises;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#F8EAD7",
    justifyContent: "center",
  },
  buttons: {
    marginBottom: 30,
  },
});

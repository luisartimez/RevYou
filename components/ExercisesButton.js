import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const ExercisesButton = ({ text, subtitle, onPress }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.buttonText}
        color="black"
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{text}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExercisesButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 30,
    backgroundColor: "white",
    marginLeft: "10.7%",
    marginRight: "10.7%",
    width: "78.6%",
    height: "9.25%",
    marginVertical: 5,
    textAlign: "right",
    shadowColor: "gray",
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowOffset: { height: 1 },
  },
  buttonText: {
    textAlign: "left",
    paddingLeft: 20,
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 20,
  },
  subtitleText: {
    color: "gray",
    marginLeft: 20,
    marginTop: 4,
    fontWeight: "bold",
  },
});

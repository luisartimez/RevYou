import React from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import arrowImage from "../assets/Arrow.png";
import dotImage from "../assets/Dot.png";
import MovingDot from "../components/MovingDot.js";
import CountdownTimer from "../components/CountdownTimer.js";

const BoxBreathingScreen = () => {
  return (
    <View style={styles.appContainer}>
      <View style={styles.aspectRatioContainer}>
        <View style={styles.arrowContainer}>
          <Image source={arrowImage} style={styles.arrowUp} />
          <Image source={arrowImage} style={styles.arrowRight} />
          <Image source={arrowImage} style={styles.arrowDown} />
          <Image source={arrowImage} style={styles.arrowLeft} />
        </View>
        <MovingDot />
        <View style={{ position: "absolute", left: "45%", top: "27%" }}>
          <Text>Inhale</Text>
        </View>
        <View style={{ position: "absolute", left: "45%", top: "70%" }}>
          <Text>Exhale</Text>
        </View>
        <View style={{ position: "absolute", left: "10%", top: "50%" }}>
          <Text>Hold</Text>
        </View>
        <View style={{ position: "absolute", left: "77%", top: "50%" }}>
          <Text>Hold</Text>
        </View>
      </View>
    </View>
  );
};

export default BoxBreathingScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#F8EAD7",
  },
  arrowContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  aspectRatioContainer: {
    aspectRatio: 1,
    width: "200%",
    maxWidth: 400,
    marginBottom: 20,
  },
  arrowUp: {
    right: "11%",
  },
  arrowRight: {
    transform: [{ rotate: "90deg" }],
    bottom: "35%",
    right: "0%",
  },
  arrowLeft: {
    transform: [{ rotate: "270deg" }],
    top: "35%",
    right: "4.3%",
  },
  arrowDown: {
    transform: [{ rotate: "180deg" }],
    left: "11%",
  },
  secondsContainer: {
    position: "absolute",
    width: "45%",
    top: "47%",
    right: "30%",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
  },
});

import React, { useState, useEffect, useRef } from "react";
import { View, Animated, Dimensions, StyleSheet, Text } from "react-native";
import CountdownTimer from "./CountdownTimer";

const { width, height } = Dimensions.get("window");

const MovingDot = () => {
  const [position, setPosition] = useState(
    new Animated.ValueXY({ x: 0.2 * width, y: 0.285 * height })
  );

  const [timer, setTimer] = useState(4); // Initializes timer to the number of seconds provided

  const animateDot = () => {
    const animations = [
      Animated.timing(position, {
        // Timer should start around here
        toValue: { x: 0.73 * width, y: 0.285 * height },
        duration: 4000,
        useNativeDriver: true, // And then reset here
      }),
      Animated.timing(position, {
        toValue: { x: 0.73 * width, y: 0.615 * height },
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(position, {
        toValue: { x: 0.2 * width, y: 0.615 * height },
        duration: 4000,
        useNativeDriver: true,
      }),
      Animated.timing(position, {
        toValue: { x: 0.2 * width, y: 0.285 * height },
        duration: 4000,
        useNativeDriver: true,
      }),
    ];

    const timerTiming = Animated.timing(timerAnimation, {
      toValue: 0,
      duration: 4000,
      useNativeDriver: true,
    });

    Animated.loop(
      Animated.parallel([Animated.sequence(animations)], timerTiming)
    ).start();
  };

  const timerAnimation = new Animated.Value(timer);

  // Starts the timer and the animation
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    animateDot();

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  // Resets timer
  useEffect(() => {
    if (timer === 0) {
      setTimer(4);
    }
  }, [timer, 4]);

  return (
    <View>
      <Animated.View
        style={[
          {
            position: "absolute",
            height: 20,
            width: 20,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "gray",
            backgroundColor: "white",
          },
          {
            transform: [{ translateX: position.x }, { translateY: position.y }],
          },
        ]}
      />
      <Text style={styles.secondsText}>{timer}</Text>
    </View>
  );
};

export default MovingDot;

const styles = StyleSheet.create({
  secondsText: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    top: "950%",
    right: "2%",
    color: "black",
  },
});

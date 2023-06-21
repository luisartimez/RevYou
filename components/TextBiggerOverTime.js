import React, { useState, useEffect } from "react";
import { Animated } from "react-native";

const TextBiggerOverTime = ({ text, durationIn, durationOut, delay }) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const increaseFont = Animated.timing(animatedValue, {
      toValue: 1,
      duration: durationIn,
      useNativeDriver: false,
    });
    const decreaseFont = Animated.timing(animatedValue, {
      toValue: 0,
      duration: durationOut,
      useNativeDriver: false,
    });
    const delayFont = Animated.delay(delay);

    Animated.loop(
      Animated.sequence([increaseFont, delayFont, decreaseFont])
    ).start();
  }, [animatedValue, durationIn, durationOut, delay]);

  const interpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 28],
  });

  return (
    <Animated.Text style={{ fontSize: interpolate }}>{text}</Animated.Text>
  );
};

export default TextBiggerOverTime;

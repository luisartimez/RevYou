import React, { useState, useEffect } from "react";
import { Text, StyleSheet } from "react-native";

const CountdownTimer = ({ seconds }) => {
  const [counter, setCounter] = useState(seconds); // Initializes timer to the number of seconds provided

  // Counts down the timer
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  // Resets timer
  useEffect(() => {
    if (counter === 0) {
      setCounter(seconds);
    }
  }, [counter, seconds]);

  return <Text style={styles.secondsText}>{counter} seconds</Text>;
};

export default CountdownTimer;

const styles = StyleSheet.create({
  secondsText: {
    textAlignVertical: "top",
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
  },
});

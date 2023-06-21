import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { MultiArcCircle } from "react-native-circles";
import * as Haptics from "expo-haptics";
import TextBiggerOverTime from "../components/TextBiggerOverTime.js";
import { useDerivedValue } from "react-native-reanimated";

const FourSevenEightBreathingScreen = () => {
  const [progress] = useState(new Animated.Value(0));
  const [stage, setStage] = useState("");
  const [textValue, setTextValue] = useState("0");

  const animateCircle = () => {
    const animations = [
      Animated.timing(progress, {
        toValue: 180,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.delay(7000),
      Animated.timing(progress, {
        toValue: 0,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ];

    Animated.loop(Animated.sequence(animations)).start();
  };

  progress.addListener(({ value }) => {
    setTextValue(value.toFixed(0));
  });

  const currentProgress = progress.__getValue();

  useEffect(() => {
    animateCircle();
  }, []);

  useEffect(() => {
    const stages = [
      { name: "Inhale", duration: 4000 },
      { name: "Hold", duration: 7000 },
      { name: "Exhale", duration: 8000 },
    ];

    let currentStageIndex = 0;
    let stageTimeout;

    const animateStage = () => {
      const currentStage = stages[currentStageIndex];
      setStage(currentStage.name);
      stageTimeout = setTimeout(() => {
        currentStageIndex = (currentStageIndex + 1) % stages.length;
        animateStage();
      }, currentStage.duration);
    };

    animateStage();

    return () => clearTimeout(stageTimeout);
  }, []);

  useEffect(() => {
    let intervalId;

    const intervalCallback = () => {
      const currentProgress = progress.__getValue();

      if (currentProgress > 0 && currentProgress < 180) {
        Haptics.impactAsync();
      }
    };

    intervalId = setInterval(intervalCallback, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.appContainer}>
      <View style={{ alignItems: "center", top: "30%" }}>
        <MultiArcCircle
          radius={150}
          intervals={[
            {
              start: 180 - currentProgress,
              end: 180 + currentProgress,
            },
          ]} // start: from 180 to 0 | end: from 180 to 360
          color="orange"
          backgroundColor="#f7f7f7"
          width={4}
        />
      </View>
      <View
        style={{
          alignSelf: "center",
          top: "48%",
          fontSize: 14,
        }}
      >
        <TextBiggerOverTime
          text={stage}
          durationIn={4000}
          durationOut={8000}
          delay={7000}
        />
      </View>
    </View>
  );
};

export default FourSevenEightBreathingScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#F8EAD7",
  },
});

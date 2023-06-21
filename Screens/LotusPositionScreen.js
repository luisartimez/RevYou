import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const LotusPositionScreen = () => {
  const data = [
    {
      id: 1,
      name: "1. Find a comfortable and quiet place to sit, with a flat surface and enough space to stretch your legs.",
    },
    {
      id: 2,
      name: "2. Sit on the floor with your legs extended in front of you.",
    },
    {
      id: 3,
      name: "3. Bend your right knee and place your right foot on your left thigh, with your sole facing upward and your heel close to your abdomen.",
    },
    {
      id: 4,
      name: "4. Repeat the same process with your left leg, bending your knee and placing your left foot on your right thigh.",
    },
    {
      id: 5,
      name: "5. Place your hands on your knees, palms up or down, and lengthen your spine.",
    },
    {
      id: 6,
      name: "6. Relax your shoulders and gaze straight ahead, focusing on your breath.",
    },
    {
      id: 7,
      name: "7. Hold the position for a few minutes, gradually increasing the time as you become more comfortable.",
    },
  ];

  const renderItem = ({ item }) => {
    return <Text style={{ alignSelf: "left", fontSize: 20 }}>{item.name}</Text>;
  };

  return (
    <View style={styles.appContainer}>
      <View
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
        }}
      >
        <FlatList data={data} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default LotusPositionScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#F8EAD7",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "white",
  },
});

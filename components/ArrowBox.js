import React from "react";
import { StyleSheet, View, Image } from "react-native";
import arrowImage from "../assets/Arrow.png";

const ArrowBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.arrowRow}>
        <Image style={styles.arrowUp} source={arrowImage} />
        <Image style={styles.arrowDown} source={arrowImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowRow: {
    flexDirection: "row",
  },
  arrow: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
});

export default ArrowBox;

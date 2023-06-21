import React, { Component } from "react";
import { View } from "react-native";
import CalendarComponent from "../components/CalendarComponent";

class CalendarScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CalendarComponent />
      </View>
    );
  }
}

export default CalendarScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [markedDates, setMarkedDates] = useState({});
  const navigation = useNavigation();

  const onDayPress = (date) => {
    setSelectedDate(date.dateString);
    const options = ["Rate Day", "Create Appoinment", "Cancel"];
    Alert.alert(
      "Options",
      "What would you like to do",
      options.map((option, index) => ({
        text: option,
        onPress: () => handleOptionPress(index, date),
      }))
    );
  };

  const handleOptionPress = (index, date) => {
    switch (index) {
      case 0:
        setRatingModalVisible(true);
        break;
      case 1:
        setSelectedDate(null);
        navigation.navigate("Agenda", { selectedDate: date });
        break;
      default:
        break;
    }
  };

  const onRatingPress = (value) => {
    const updatedMarkedDates = {
      ...markedDates,
      [selectedDate]: {
        selected: true,
        selectedColor: `rgb(${255 - value * 25}, ${value * 25}, 0)`,
        rating: value,
      },
    };
    setMarkedDates(updatedMarkedDates);
    setRating(value);
    setRatingModalVisible(false);
  };

  const renderRatingModal = () => {
    return (
      <Modal visible={ratingModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rate your day</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[styles.ratingButton, rating >= value]}
                  value={this.AddItemsToArray}
                  onPress={() => onRatingPress(value)}
                >
                  <Text style={[styles.ratingButtonText, rating >= value]}>
                    {value}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View>
      <Calendar markedDates={markedDates} onDayPress={onDayPress} />
      {selectedDate && (
        <View style={{ backgroundColor: "#eee", padding: 10, marginTop: 20 }}>
          {markedDates[selectedDate] && (
            <Text style={{ marginTop: 10 }}>
              Rating: {markedDates[selectedDate].rating}
            </Text>
          )}
        </View>
      )}
      {renderRatingModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ratingButton: {
    backgroundColor: "#eee",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  ratingButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CalendarComponent;

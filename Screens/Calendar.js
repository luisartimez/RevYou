import React, { useState } from "react";
import { View, Text } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";

const TestCalendar = () => {
  const [markedDates, setMarkedDates] = useState({
    "2021-01-20": { textColor: "green" },
    "2021-01-22": { startingDay: true, color: "green" },
    "2021-01-23": {
      selected: true,
      endingDay: true,
      color: "green",
      textColor: "gray",
    },
    "2021-01-04": {
      disabled: true,
      startingDay: true,
      color: "green",
      endingDay: true,
    },
  });

  const handleDayPress = (day) => {
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        selectedColor: "red",
      },
    });
  };

  return (
    <Calendar
      markedDates={markedDates}
      markingType={"simple"}
      onDayPress={handleDayPress}
    />
  );
};

export default TestCalendar;

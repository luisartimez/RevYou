import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Agenda } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";

const AgendaScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [agendaItems, setAgendaItems] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newItemName, setNewItemName] = useState("");
  const [newItemTime, setNewItemTime] = useState(new Date());

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const openAddItemModal = () => {
    setShowModal(true);
  };

  const saveItem = () => {
    const items = agendaItems[selectedDate] || [];
    console.log("Selected date is", selectedDate);

    items.push({
      name: newItemName,
      time: newItemTime,
    });

    setAgendaItems({
      ...agendaItems,
      [selectedDate]: items,
    });

    setNewItemName("");
    setNewItemTime(new Date());
    setShowModal(false);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemTime}>{item.time.toLocaleTimeString()}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.emptyDateText}>No Items Scheduled</Text>
      </View>
    );
  };

  const onChange = (event, selectedTime) => {
    setNewItemTime(selectedTime || newItemTime);
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={agendaItems}
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        onDayPress={onDayPress}
      />
      <TouchableOpacity style={styles.addButton} onPress={openAddItemModal}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
      {showModal && (
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Item</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Item Name"
              value={newItemName}
              onChangeText={setNewItemName}
            />
            <DateTimePicker
              value={newItemTime}
              mode="time"
              display="spinner"
              onChange={onChange}
            />
            <Button title="Save Item" onPress={saveItem} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemTime: {
    fontWeight: "bold",
  },
  itemName: {
    marginTop: 5,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  emptyDateText: {
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#f2f2f2",
    padding: "10%",
    alignItems: "center",
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 20,
  },
  modalInput: {
    textAlign: "center",
    fontSize: 20,
    paddingTop: 10,
  },
  modal: {
    flex: 2,
  },
});

export default AgendaScreen;

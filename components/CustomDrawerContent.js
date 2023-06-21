import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

function CustomDrawerContent(props) {
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const navigation = useNavigation();

  const takeToLoginScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login Screen" }],
    });
  };

  const handleLogout = () => {
    // Add your sign-out logic here
    // This could include clearing the user's session or resetting the app state
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserEmail("");
        setDisplayName("");
        Alert.alert("Logout Successful!", "See you soon!", [
          {
            text: "OK",
            onPress: takeToLoginScreen,
            style: "cancel",
          },
        ]);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerItem label="Home" onPress={() => navigation.navigate("Home")} />
        <DrawerItem
          label="Calendar"
          onPress={() => navigation.navigate("Calendar")}
        />
        <DrawerItem
          label="Agenda"
          onPress={() => navigation.navigate("Agenda")}
        />
        <DrawerItem
          label="Exercises"
          onPress={() => navigation.navigate("Exercises")}
        />
        <TouchableOpacity onPress={handleLogout} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  signOutButton: {
    marginTop: "3%",
    padding: 10,
    borderRadius: 5,
    marginLeft: "3%",
  },
  signOutButtonText: {
    color: "gray",
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;

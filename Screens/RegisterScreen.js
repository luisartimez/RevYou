import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Alert,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref, get, child } from "firebase/database";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RegisterScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [providedName, setProvidedName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const db = getDatabase();

  function writeUserData(userId, name, email) {
    set(ref(db, "users/" + userId), {
      username: name,
      email: email,
    });
  }

  const handleRegisterButtonPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Sidebar" }],
    });
  };

  const handleRegister = () => {
    console.log("Handling registration...");
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userId = user.uid;

        writeUserData(userId, providedName, email);

        // Get username by userId
        const usernameRef = child(ref(db), "users/" + userId + "/username");
        get(usernameRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const username = snapshot.val();
              setDisplayName(username);
              Alert.alert(
                "Registration Successful!",
                "Welcome to RevYou, " + username + "!",
                [
                  {
                    text: "OK",
                    onPress: handleRegisterButtonPress,
                    style: "cancel",
                  },
                ]
              );
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Registration Failed", errorMessage, [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
        // ..
      });
  };

  return (
    <View style={styles.appContainer}>
      <KeyboardAvoidingView
        style={{ width: "100%", alignItems: "center" }}
        behavior="padding"
        keyboardVerticalOffset={150}
      >
        <Text style={styles.accountSetupText}>Account Setup</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setProvidedName}
          value={providedName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <View style={styles.registerButton}>
          <Button title="Register" color="black" onPress={handleRegister} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#F8EAD7",
    justifyContent: "center",
    alignItems: "center",
  },
  accountSetupText: {
    right: "23%",
    paddingBottom: "5%",
    textDecorationLine: "underline",
    fontSize: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 10,
    borderRadius: 16,
    shadowColor: "gray",
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowOffset: { height: 1 },
  },
  registerButton: {
    backgroundColor: "#EEE0E0",
    borderColor: "#EEE0E0",
    borderWidth: 1,
    borderRadius: 15,
    width: "50%",
    shadowColor: "gray",
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowOffset: { height: 1 },
  },
});

export default RegisterScreen;

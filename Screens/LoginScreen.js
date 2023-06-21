import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "firebase/database";
import { getDatabase, ref, get, child } from "firebase/database";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("");

  const db = getDatabase();

  const handleLoginButtonPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Sidebar" }],
    });
  };

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const userId = user.uid;
        setUserEmail(user.email);

        // Get username by userId
        const usernameRef = child(ref(db), "users/" + userId + "/username");
        get(usernameRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const username = snapshot.val();
              setDisplayName(username);
              console.log("Logged name is:", username);
              Alert.alert("Login Successful", "Welcome back, " + username, [
                {
                  text: "OK",
                  onPress: handleLoginButtonPress,
                  style: "cancel",
                },
              ]);
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

        Alert.alert("Login Failed", errorMessage, [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUserEmail("");
        setDisplayName("");
        Alert.alert("Logout Successful!", "See you soon!", [
          {
            text: "OK",
            style: "cancel",
          },
        ]);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <View style={styles.appContainer}>
      <KeyboardAvoidingView
        style={{ width: "100%", alignItems: "center" }}
        behavior="padding"
        keyboardVerticalOffset={150}
      >
        <Text style={{ fontSize: 64, bottom: "20%" }}>RevYou</Text>
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
        <View style={styles.buttonStyle}>
          <Button title="Login" color="black" onPress={handleLogin} />
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          top: "25%",
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Don't have an account?
        </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.buttonStyle}>
            <Button
              title="Register"
              color="black"
              onPress={() => navigation.navigate("Register Screen")}
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Skip"
              color="black"
              onPress={() => handleLoginButtonPress()}
            />
          </View>
        </View>
      </View>
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
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "gray",
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowOffset: { height: 1 },
  },
  buttonStyle: {
    marginHorizontal: "6%",
    backgroundColor: "#E1E2E2",
    borderColor: "#E1E2E2",
    borderWidth: 1,
    borderRadius: 100,
    width: "25%",
    shadowColor: "gray",
    shadowRadius: 1,
    shadowOpacity: 1,
    shadowOffset: { height: 1 },
  },
  buttonsContainer: {
    flexDirection: "row",
  },
});

export default LoginScreen;

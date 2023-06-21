import React, { useState, useEffect } from "react";
import { View, Text, Button, ImageBackground } from "react-native";
import firebase from "firebase/app";
import { getDatabase, set, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [displayName, setDisplayName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const checkIfLoggedIn = onAuthStateChanged(auth, (user) => {
      if (user) {
        onValue(ref(db, "users/" + user.uid + "/username"), (snapshot) => {
          const username = snapshot.val();
          setDisplayName(username);
          setIsLoggedIn(true);
        });
      } else {
        setDisplayName("");
        setIsLoggedIn(false);
      }
    });

    return () => checkIfLoggedIn();
  }, []);

  return (
    <View>
      <View style={{ height: 300, width: null, overflow: "hidden" }}>
        <ImageBackground
          style={{
            flex: 1,
            height: null,
            width: null,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
          resizeMode="cover"
          source={require("../assets/meditation.png")}
          imageStyle={{ opacity: 2.5 }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            Welcome to RevYou
          </Text>
        </ImageBackground>
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 15,
            fontWeight: "400",
            color: "black",
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          RevYou is an app designed to help you monitor your mental and physical
          well-being
        </Text>
      </View>
      {isLoggedIn ? (
        <Text style={{ top: "10%", fontSize: 25 }}>
          Hello, {displayName}, let's do a RevYou
        </Text>
      ) : (
        <Text>You are not logged in.</Text>
      )}
    </View>
  );
};

export default Home;

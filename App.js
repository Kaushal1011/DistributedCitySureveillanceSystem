import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Button, Alert, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoFont}>CDSS</Text>
      </View>

      <Button
        title="Make a WARNING!"
        onPress={() => navigation.navigate("Details")}
      />
      <StatusBar style="auto" />
    </View>
  );
}
function sendCoords(lat, long) {
  fetch("http://192.168.0.68:5000/civic/warning", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "email@email",
      coords: {
        x: long,
        y: lat,
      },
    }),
  }).then((response) => {
    if (response.status === 200) {
      console.log("success");

      Alert.alert("Success");
    } else {
      console.log("error");

      Alert.alert("No response from server");
    }
  });
}
function DetailsScreen() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={
          (findCoordinates = () => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const location = JSON.stringify(position);

                setLatitude(position["coords"]["latitude"]);
                setLongitude(position["coords"]["longitude"]);
                sendCoords(
                  position["coords"]["latitude"],
                  position["coords"]["longitude"]
                );
              },
              (error) => Alert.alert(error.message),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
          })
        }
        title="WARNING!!!"
      />
      <Text>Latitude: {latitude}</Text>
      <Text>Longitude: {longitude}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#bce6eb",
    alignItems: "center",
  },
  logo: {
    flex: 0.3,
    marginTop: 200,
    backgroundColor: "#34626c",
    width: 300,
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  logoFont: {
    alignItems: "center",
    marginTop: 100,
    marginLeft: 100,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
});

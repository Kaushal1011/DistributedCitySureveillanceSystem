import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Button, Alert, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoFont}>CDSS</Text>
      </View>
      <View style={styles.butt}>
        <Button
          title="Make a WARNING!"
          onPress={() => navigation.navigate("Warnings")}
          color="#000000"
        />
      </View>
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

function Helpdetails(lat, long) {
  fetch("http://192.168.0.68:5000/civic/cfh", {
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

function WarningsScreen({ navigation }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 150,
      }}
    >
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
        title="WARNING"
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 170,
        }}
      >
        <Button
          title="Call for help"
          onPress={
            (findCoordinates = () => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const location = JSON.stringify(position);

                  setLatitude(position["coords"]["latitude"]);
                  setLongitude(position["coords"]["longitude"]);
                  Helpdetails(
                    position["coords"]["latitude"],
                    position["coords"]["longitude"]
                  );
                },
                (error) => Alert.alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
              );
            })
          }
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Button
          title="DANGER !!!"
          onPress={() => navigation.navigate("Danger")}
        />
      </View>
    </View>
  );
}

function DangerDetails(lat, long, desc) {
  fetch("http://192.168.0.68:5000/civic/detailedreport", {
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
      details: desc,
      view: "",
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

function DangerScreen({ navigation }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [Desc, setDesc] = useState("");
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <View>
        <Text style={styles.DescFont}>Describe the crime</Text>
      </View>
      <TextInput
        style={styles.Textinp}
        onChangeText={(text) => setDesc(text)}
        value={Desc}
      />
      <Button
        title="Submit"
        onPress={
          (findCoordinates = () => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const location = JSON.stringify(position);

                setLatitude(position["coords"]["latitude"]);
                setLongitude(position["coords"]["longitude"]);

                DangerDetails(
                  position["coords"]["latitude"],
                  position["coords"]["longitude"],
                  Desc
                );
              },
              (error) => Alert.alert(error.message),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
          })
        }
      />
      <View>
        <Button title="Go Home" onPress={() => navigation.navigate("Home")} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Warnings" component={WarningsScreen} />

        <Stack.Screen name="Danger" component={DangerScreen} />
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
    marginTop: 50,
    marginLeft: 100,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  DescFont: {
    marginTop: 50,

    color: "#000000",
    fontWeight: "bold",
    fontSize: 30,
  },
  Textinp: {
    marginTop: 50,
    marginBottom: 10,
    width: 300,
    height: 40,
    borderWidth: 1,
  },
});

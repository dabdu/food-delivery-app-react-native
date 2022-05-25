import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth, DataStore } from "aws-amplify";
import { useAuthContext } from "../contexts/AuthContext";
import { User } from "../models";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const { sub, dbUser, setDbUser } = useAuthContext();
  const [name, setName] = useState(dbUser?.name || "");
  const [address, setAddress] = useState(dbUser?.address || "");
  const [lat, setLat] = useState(dbUser?.lat + " " || " ");
  const [lng, setLng] = useState(dbUser?.lng + " " || " ");

  const navigation = useNavigation();
  const onSave = async () => {
    if (dbUser) {
      await updateUser();
      // Alert.alert("Info Saved Successfully");
      // navigation.goBack();
    } else {
      await createUser();
      // Alert.alert("Info Saved Successfully");
      // navigation.goBack();
    }
  };

  const createUser = async () => {
    try {
      const user = await DataStore.save(
        new User({
          sub,
          name,
          address,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        })
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  const updateUser = async () => {
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.name = name;
          updated.address = address;
          updated.lat = parseFloat(lat);
          updated.lng = parseFloat(lng);
        })
      );
      setDbUser(user);
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };
  const onSignOut = () => {};

  return (
    <SafeAreaView>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />
      <TextInput
        value={address}
        onChangeText={setAddress}
        placeholder="Address"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitude"
        style={styles.input}
        // keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitude"
        style={styles.input}
        // keyboardType="numeric"
      />
      <Button onPress={onSave} title="Save" style={{ margin: 10 }} />
      <TouchableOpacity
        style={{
          backgroundColor: "orange",
          color: "white",
          alignItems: "center",
          paddingVertical: 10,
          borderRadius: 30,
          margin: 20,
        }}
        onPress={() => Auth.signOut()}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    marginHorizontal: 25,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default Profile;

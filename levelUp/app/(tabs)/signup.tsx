import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CreateUserResponse = {
  message: string;
  error?: string;
  token?: string; // Include token in the expected response type
};

export default function CreateUserScreen() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async () => {
    try {
      // Send the username and password to your Flask API
      const result = await axios.post<CreateUserResponse>(
        "http://10.40.144.249:5000/create_user",
        { username, password }
      );

      // Display response message from API
      if (result.data.error) {
        setResponse(result.data.error);
      } else {
        setResponse(result.data.message);

        // If a token is received, store it securely
        if (result.data.token) {
          await AsyncStorage.setItem("jwt_token", result.data.token);
          console.log("JWT Token saved:", result.data.token);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error fetching response");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Create User" onPress={handleSubmit} />
      <Text style={styles.responseText}>Response: {response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    color: "black",
  },
  responseText: {
    marginTop: 20,
    fontSize: 18,
    color: "black",
  },
});

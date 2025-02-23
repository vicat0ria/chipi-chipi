 import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import axios from "axios";

type PredictionResponse = {
  prediction: number; // 1 = Positive, 0 = Negative
};

export default function MLScreen() {
  const [text, setText] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async () => {
    try {
      // Send the text input to your Flask API
      const result = await axios.post<PredictionResponse>(
        "http://10.40.144.249:5000/predict",
        { text }
      );
      
      // Display prediction result
      setResponse(result.data.prediction === 1 ? "Positive" : "Negative");
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error fetching response");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text for prediction"
        value={text}
        onChangeText={setText}
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Text style={styles.predictionText}>Prediction: {response}</Text>
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
    color: "white",
  },
  predictionText: {
    marginTop: 20,
    fontSize: 18,
    color: "white",
  },
});

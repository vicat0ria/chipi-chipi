import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

export default function LeaderboardScreen() {
  
  return (
      <Text style={styles.predictionText}>Leaderboard Page</Text>
  );
}

const styles = StyleSheet.create({
  predictionText: {
    marginTop: 100,
    fontSize: 18,
    color: "white",
  },
});

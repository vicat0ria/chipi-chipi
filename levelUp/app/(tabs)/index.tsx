import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import NotificationsHandler from '../../components/NotificationsHandler.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <NotificationsHandler /> {/* This will ask for notification permissions on startup */}
    </NavigationContainer>
  );
};

export default function HomeScreen() {
  
  return (
      <Text style={styles.predictionText}>Home Page</Text>
  );
}

const styles = StyleSheet.create({
  predictionText: {
    marginTop: 100,
    fontSize: 18,
    color: "white",
  },
});

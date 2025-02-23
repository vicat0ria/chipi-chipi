import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.expTitle}>EXP: 1765</Text>
        <View style={styles.line} />
        <Text style={styles.subtitle}>American Sign Language</Text>
        <Text style={styles.subtitle}>Level 1</Text>
    <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.navigate('play')}
    >
      <Text style={styles.buttonText}>Learn</Text>
    </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    marginTop: 50,
  },
  expTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3DA35D',
    textAlign: 'center',
  },
  line: {
    width: '80%',
    height: 2,
    backgroundColor: '#3DA35D',
    marginVertical: 30,
  },
  subtitle: {
    fontSize: 24,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight:'bold',
  },
  button: {
    backgroundColor: '#3DA35D',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 30,
  },
  buttonText: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;


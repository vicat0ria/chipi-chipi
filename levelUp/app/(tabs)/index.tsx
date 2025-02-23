import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const HomeScreen: React.FC = () => {
  const sound = useRef<Audio.Sound | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Load and play the music when the component mounts
    const loadMusic = async () => {
      try {
        sound.current = new Audio.Sound();
        await sound.current.loadAsync(require('../../assets/sounds/armprojhack.mp3'));
        await sound.current.setIsLoopingAsync(true); // Enable looping
        await sound.current.playAsync();
      } catch (error) {
        console.error('Error loading music', error);
      }
    };

    loadMusic();

    // Cleanup: Stop and unload the sound when the component unmounts
    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const handlePlayPress = async () => {
    if (sound.current) {
      await sound.current.stopAsync(); // Stop the music
      await sound.current.unloadAsync(); // Unload the music
    }
    navigation.navigate('play'); // Navigate to the next screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.expTitle}>EXP: 1765</Text>
        <View style={styles.line} />
        <Text style={styles.subtitle}>American Sign Language</Text>
        <Text style={styles.subtitle}>Level 1</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handlePlayPress} // Stop music before navigating
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
    fontWeight: 'bold',
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

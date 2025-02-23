import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated, Image, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import character from '../../assets/images/character.png';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  
  // Floating Animation for Character
  const floatAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -15, 
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 15, 
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Button Pulse Animation
  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Bounce Effect for Subtitle
  const bounceAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.expTitle}>EXP: 1765</Text>
        <View style={styles.line} />
        
        {/* Subtitle with Bounce Effect */}
        <Animated.Text style={[styles.subtitleASL, { transform: [{ scale: bounceAnim }] }]}>
          American Sign Language  ▼
        </Animated.Text>

        <Text style={styles.subtitle}>Lesson 1</Text>

        {/* Animated Learn Button */}
        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('play')}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Learn</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Animated Floating Character */}
        <Animated.Image
          alt="Character"
          resizeMode="contain"
          style={[styles.character, { transform: [{ translateY: floatAnim }] }]}
          source={character}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  character: {
    width: 400,
    height: 350,
    alignSelf: 'center', 
    marginTop: 40,
    marginLeft: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff', // Warm, inviting background
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
    color: '#3DA35D', // Bright, engaging color
    textAlign: 'center',
  },
  line: {
    width: '80%',
    height: 3,
    backgroundColor: '#3DA35D',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 26,
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitleASL: {
    fontSize: 22,
    color: 'black',
    backgroundColor: '#fff', 
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    borderWidth: 2, 
    borderColor: '#3DA35D', 
    padding: 10, 
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#3DA35D',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;

import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity, Animated 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const PlayScreen: React.FC = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);

  const lessons = [
    { letter: 'A', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Sign_language_A.svg/646px-Sign_language_A.svg.png' },
    { letter: 'B', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Sign_language_B.svg/396px-Sign_language_B.svg.png' },
    { letter: 'C', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Sign_language_C.svg/832px-Sign_language_C.svg.png' },
    { letter: 'D', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Sign_language_D.svg/484px-Sign_language_D.svg.png' }
  ];


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.lessonTitle}>Lesson 1</Text>
        
        {lessons.map((lesson, index) => (
          <TouchableOpacity key={index} style={styles.lessonContainer}>
            <Text style={styles.subtitle}>Letter {lesson.letter}</Text>
            <Image 
              source={{ uri: lesson.imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.navigate('quiz')}
        >
          <Text style={styles.btnText}>Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  lessonTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3DA35D',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  lessonContainer: {
    marginBottom: 40,
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 15,
  },
  image: {
    width: 150,
    height: 150,
  },
  subtitle: {
    fontSize: 24,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#3DA35D',
  },
  btnText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
});

export default PlayScreen;

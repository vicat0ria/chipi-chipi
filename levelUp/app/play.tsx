import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PlayScreen: React.FC = () => {
  const navigation = useNavigation();

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
          <View key={index} style={styles.lessonContainer}>
            <Text style={styles.subtitle}>Letter {lesson.letter}</Text>
            <Image 
              source={{ uri: lesson.imageUrl }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        ))}
        <TouchableOpacity 
          style={styles.btn} 
          onPress={() => navigation.navigate('temp')}
        >
          <Text style={styles.btnText}>Quiz Yourself!</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  lessonTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3DA35D',
    marginVertical: 20,
    textAlign: 'center',
  },
  lessonContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  subtitle: {
    fontSize: 24,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3DA35D',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});

export default PlayScreen;

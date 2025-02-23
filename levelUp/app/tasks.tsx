import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const Tasks: React.FC = () => {
  const navigation = useNavigation(); // Get the navigation object
  const { height } = Dimensions.get('window'); // Get the screen height

  const handleButtonPress = (taskCount: number) => {
    navigation.navigate('(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set your daily goal:</Text>
      <View style={[styles.buttonContainer, { minHeight: height * 0.8 }]}>
        {[3, 5, 10, 15, 20].map((taskCount) => (
          <TouchableOpacity
            key={taskCount}
            style={styles.button}
            onPress={() => handleButtonPress(taskCount)}
          >
            <Text style={styles.buttonText}>Learn {taskCount} Letter{taskCount > 1 ? 's' : ''}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: 'black', 
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly', 
    width: '100%',
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderWidth: 1,
    backgroundColor: '#3DA35D',
    borderColor: '#3DA35D',
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Tasks;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const TempScreen = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Function to handle the fetch request with axios
  const fetchUser = async () => {
    if (!username) {
      Alert.alert('Error', 'Please enter a username');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`http://10.40.144.249:5000/get_user/${username}`);

      if (response.data.status === 'success') {
        setUser(response.data.user);
      } else {
        Alert.alert('Error', response.data.message || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Enter the Username</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />
      
      <Button title={loading ? 'Loading...' : 'Fetch User'} onPress={fetchUser} disabled={loading} />
      
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.subHeader}>User Information:</Text>
          <Text style={styles.userData}>Username: {user.username}</Text>
          <Text style={styles.userData}>Email: {user.email}</Text>
          <Text style={styles.userData}>Full Name: {user.fullName}</Text>
          {/* Add other user fields as needed */}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  userInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userData: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default TempScreen;

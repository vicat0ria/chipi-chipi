import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Image} from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import logo from '../assets/images/LU-Logo.png';
import { TouchableOpacity } from 'react-native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CreateUserResponse = {
  message: string;
  error?: string;
};

export default function CreateUserScreen() {

  const navigation = useNavigation();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async () => {
    try {
      // Send the username and password to your Flask API
      const result = await axios.post<CreateUserResponse>(
        "http://10.40.144.249:5000/login",
        { username, password }
      );
      
      // Display response message from API
      if (result.data.error) {
        setResponse(result.data.error);
      } else {
        setResponse(result.data.message);
        console.log(result.data.token)
        await AsyncStorage.setItem('authToken', result.data.token);  // Save token
        navigation.navigate('tasks');
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error fetching response");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={logo}
          />
        <Text style={styles.title}>Log in to LevelUp!</Text>
        <Text style={styles.subtitle}>Are you ready to conquer the ASL Bosses?</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.inputControl}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputControl}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

      <View style={styles.formAction}>
          <Text style={styles.responseText}>{response}</Text>
          
          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.responseText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('tasks')}>
        <Text style={[styles.responseText, { color: 'blue' }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    padding: 24,
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#3DA35D', 
    marginBottom: 20,
    marginTop: 0,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
    marginBottom: 16,
  },
  responseText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
    marginTop: 5,
  },
  headerImg: {
    width: 200,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#3DA35D',
    borderColor: '#3DA35D',
    marginTop: 10,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});

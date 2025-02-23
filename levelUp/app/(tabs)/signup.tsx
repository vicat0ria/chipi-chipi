import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GetLeaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<[string, number][]>([]);

  const fetchLeaderboard = async () => {
      try {
          const response = await axios.get('https://10.40.144.249:5000/leaderboard');

          if (response.status === 200) {
              console.log("Fetched leaderboard:", response.data);
              setLeaderboard(response.data); // Assuming response contains leaderboard array
          } else {
              Alert.alert('Error', 'Failed to fetch leaderboard');
          }
      } catch (error) {
          console.error(error);
          Alert.alert('Error', 'An error occurred while fetching leaderboard');
      }
  };

  useEffect(() => {
      fetchLeaderboard();
  }, []);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Leaderboard:</Text>
          {leaderboard.length > 0 ? (
              leaderboard.map(([username, score], index) => (
                  <Text key={index}>{index + 1}. {username} - {score}</Text>
              ))
          ) : (
              <Text>Loading...</Text>
          )}
          <Button title="Refresh Leaderboard" onPress={fetchLeaderboard} />
      </View>
  );
};


export default GetLeaderboard;

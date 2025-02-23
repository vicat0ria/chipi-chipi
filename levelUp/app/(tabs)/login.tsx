import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GetUserLevel: React.FC = () => {
    const [level, setLevel] = useState<number | null>(null);

    const fetchUserLevel = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (!token) {
                Alert.alert('Error', 'No authentication token found');
                return;
            }

            const response = await axios.get('http://10.40.144.249:5000/get_level', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setLevel(response.data.level);
                console.log(response.data.level)
            } else {
                Alert.alert('Error', response.data.error || 'Failed to fetch level');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while fetching user level');
        }
    };

    useEffect(() => {
        fetchUserLevel();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>User Level: {level !== null ? level : 'Loading...'}</Text>
            <Button title="Refresh Level" onPress={fetchUserLevel} />
        </View>
    );
};

export default GetUserLevel;

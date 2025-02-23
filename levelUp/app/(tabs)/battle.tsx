import React, { useEffect, useState } from 'react';
import Blitz from '../../assets/images/blitz.png';
import Background from '../../assets/images/battle_background.png';  
import { useNavigation } from '@react-navigation/native'; 
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuScreen: React.FC = () => {
    const navigation = useNavigation();
    const [level, setLevel] = useState<number | null>(null);

    useEffect(() => {
        const fetchLevel = async () => {
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

                // Check if the status is 200 (OK)
                if (response.status === 200) {
                    console.log(response.data.level);
                    setLevel(response.data.level); // Update state with fetched level
                } else {
                    console.error("Failed to fetch level: ", response.status);
                }
            } catch (error) {
                console.error("Error fetching level:", error);
            }
        };

        fetchLevel();
    }, []);

    return (
        <ImageBackground
            source={Background}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            {/* Top-left corner: Level */}
            <View style={styles.topLeftCorner}>
                <Text style={styles.levelText}>LVL {level !== null ? level : "..."}</Text>
            </View>

            {/* Top-right corner: XP */}
            <View style={styles.topRightCorner}>
                <Text style={styles.xpText}>XP: 0/5</Text>
            </View>

            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('char-stats', { level: level })}>
                <Text style={styles.buttonText}>Play</Text>
            </TouchableOpacity>

            {/* Bottom Image */}
            <Image source={Blitz} style={styles.bottomImage} />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        width: "150%",
        height: "150%",
        resizeMode: "cover",
        marginTop: -350,
        marginLeft: -100,
    },
    topLeftCorner: {
        position: "absolute",
        top: 50,
        left: 10,
    },
    topRightCorner: {
        position: "absolute",
        top: 50,
        right: 10,
    },
    levelText: {
        fontSize: 50,
        fontWeight: "bold",
        color: "#fff",
        backgroundColor: "#134611",
        padding: 5,
        borderRadius: 5,
        textShadowColor: "black",
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 0,
    },
    xpText: {
        fontSize: 50,
        color: "#fff",
        backgroundColor: "#134611",
        padding: 5,
        borderRadius: 5,
        textShadowColor: "black",
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 0,
    },
    centerContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "50%",
        left: "40%",
        transform: [{ translateX: -50 }],
    },
    button: {
        backgroundColor: "#134611",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        minWidth: 200,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    bottomImage: {
        position: "absolute",
        right: 85,
        bottom: 50,
        width: "80%",
        height: 300,
        resizeMode: "contain",
        transform: [{ scaleX: -1 }],
    },
});

export default MenuScreen;

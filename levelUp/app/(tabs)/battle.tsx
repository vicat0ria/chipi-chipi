import React from 'react';
import Blitz from '../../assets/images/blitz.png';
import Background from '../../assets/images/battle_background.png';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LessonScreen: React.FC = () => {
    // Function to handle button press with vibration and navigate to SkillPointsScreen
    const handlePlayPress = () => {
        Vibration.vibrate(500); // Vibrate for 500ms when Play is pressed
    };

    return (
        <ImageBackground
            source={Background}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            {/* Top-left: Lvl */}
            <View style={styles.topLeftCorner}>
                <Text style={styles.levelText}>Lvl 1</Text>
            </View>

            {/* Top-right: XP */}
            <View style={styles.topRightCorner}>
                <Text style={styles.xpText}>XP: 0/10</Text>
            </View>

            {/* Centered: Play Button */}
            <View style={styles.centerContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePlayPress}>
                    <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
            </View>

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
        width: "100%",
        height: "100%",
        resizeMode: "cover",
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
        top: "45%", // Lowered by 100 pixels
        left: "50%",
        transform: [{ translateX: -100 }],
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
        right: 75,
        bottom: 50,
        width: "80%",
        height: 250,
        resizeMode: "contain",
        transform: [{ scaleX: -1 }],
    },
});

export default LessonScreen;

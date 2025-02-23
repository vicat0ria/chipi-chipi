import React from 'react';
import Blitz from '../../assets/images/blitz.png';
import Background from '../../assets/images/battle_background.png'; //https://opengameart.org/content/green-meadow-pixel-art-background
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';// Import the navigation hook



const MenuScreen: React.FC = () => {

    const navigation = useNavigation(); 

    return (
        <ImageBackground
            source={Background}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.topLeftCorner}>
                <Text style={styles.levelText}>LVL 1</Text>
            </View>

            {/* Top-right: XP */}
            <View style={styles.topRightCorner}>
                <Text style={styles.xpText}>XP: 0/10</Text>
            </View>

            {/* Centered: Play Button */}
            <View style={styles.centerContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePlayPress}>

            {/* Top-middle corner: XP*/}
                <View style={styles.topRightCorner}>
                <Text style={styles.xpText}>XP: 0/5</Text>
            </View>

            {/* Centered: "Play" button */}
            <View style={styles.centerContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('char-stats')}}>

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
        width: "150%",
        height: "150%",
        resizeMode: "cover",
        marginTop: -350,  // Moves background lower
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


        position: "absolute", // Required when using `top`
        bottom: "50%", // Adjust to move it lower
        left: "40%", // Center it horizontally
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

        width: "80%", // Adjust width as needed
        height: 300, // Adjust height as needed
        resizeMode: "contain",
        transform: [{ scaleX: -1 }],
    },
});

export default MenuScreen;
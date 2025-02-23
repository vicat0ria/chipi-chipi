import React, { useState } from 'react';
import Blitz from '../assets/images/blitz.png'
import Background from '../assets/images/battle_background.png'
import Sword from '../assets/images/sword.png'
import Heart from '../assets/images/heart.png'
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const LessonScreen: React.FC = () => {

    const [skillPoints, setSkillPoints] = useState(10); // Max skill points
    const [hp, setHp] = useState(0); // Start at 0, max 5
    const [attack, setAttack] = useState(0); // Start at 0, max 5
    const [locked, setLocked] = useState(false); // Lock stats on battle


    // Function to allocate points
    const increaseStat = (stat: 'hp' | 'attack') => {
        if (skillPoints > 0) {
            if (stat === 'hp' && hp < 5) {
                setHp(hp + 1);
                setSkillPoints(skillPoints - 1);
            } else if (stat === 'attack' && attack < 5) {
                setAttack(attack + 1);
                setSkillPoints(skillPoints - 1);
            }
        }
    };

    // Function to remove points
    const decreaseStat = (stat: 'hp' | 'attack') => {
        if (stat === 'hp' && hp > 0) {
            setHp(hp - 1);
            setSkillPoints(skillPoints + 1);
        } else if (stat === 'attack' && attack > 0) {
            setAttack(attack - 1);
            setSkillPoints(skillPoints + 1);
        }
    };

     // Lock stats on battle
    const handleBattle = () => {
        setLocked(true);
    };

    return (
        <ImageBackground
        source={Background}
        style={styles.background}
            imageStyle={styles.backgroundImage} // Apply zoom only to the background image
        >
            {/* Top-middle corner: Lvl*/}
            <View style={styles.topLeftCorner}>
                <Text style={styles.levelText}>LVL 1</Text>
            </View>

            {/* Top-middle corner: XP */}
                <View style={styles.topRightCorner}>
                <Text style={styles.xpText}>XP: 0/5</Text>
            </View>

            {/* Skill Points Remaining */}
            <View style={styles.skillPointsContainer}>
                <Text style={styles.skillText}>Skill Points: {skillPoints}</Text>
            </View>

            {/* Stats Allocation */}
            <View style={styles.statsContainer}>
                {/* HP Stat */}
                <View style={styles.statRow}>
                    <TouchableOpacity disabled={locked} onPress={() => decreaseStat('hp')} style={styles.statButton}>
                        <Text style={styles.statButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.statValue}>{hp}</Text>
                    <TouchableOpacity disabled={locked} onPress={() => increaseStat('hp')} style={styles.statButton}>
                        <Text style={styles.statButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Attack Stat */}
                <View style={styles.statRow}>
                    <TouchableOpacity disabled={locked} onPress={() => decreaseStat('attack')} style={styles.statButton}>
                        <Text style={styles.statButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.statValue}>{attack}</Text>
                    <TouchableOpacity disabled={locked} onPress={() => increaseStat('attack')} style={styles.statButton}>
                        <Text style={styles.statButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Centered: "Battle!" button */}
            <View style={styles.bottomRight}>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                    <Text style={styles.buttonText}>Battle!</Text>
                </TouchableOpacity>
            </View>

            {/* Top-middle corner: XP */}
            <View style={styles.stats}>
                <Text style={styles.xpText}>0</Text>
            </View>


            <View style={styles.characterContainer}>
                <Image source={Blitz} style={styles.characterImage} />
            </View>

            <View style={styles.swordContainer}>
                <Image source={Sword} style={styles.swordImage} />
            </View>

            <View style={styles.heartContainer}>
                <Image source={Heart} style={styles.heartImage} />
            </View>
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
        top:50,
        left: 10,
    },
    topRightCorner: {
      position: "absolute",
      top: 50,
      right: 10,
    },
    bottomRight: {
        position: "absolute",
        bottom: 225, // Adjust to move higher or lower
        right: 30,  // Adjust for more spacing from the right
    },

  levelText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff", // Main text color
    backgroundColor: "#134611",
    padding: 5,
    borderRadius: 5,
    
    // Outline effect
    textShadowColor: "black", // Outline color
    textShadowOffset: { width: 5, height: 5 }, // Shadow direction
    textShadowRadius: 0, // Blur effect (adjust as needed)
    },
    
    xpText: {
        fontSize: 50,
        color: "#fff",
        backgroundColor: "#134611",
        padding: 5,
        borderRadius: 5,

    // Outline effect
        textShadowColor: "black",
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 0,
    },

    button: {
      backgroundColor: "#134611",
      paddingVertical: 15,
      paddingHorizontal: 15, 
      borderRadius: 10,
      minWidth: 100, 
      alignItems: "center", 
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20, 
    },   

    characterContainer: {
        position: "absolute",
        left: 0, // Adjust based on your layout
        bottom: 75, // Adjust height positioning
        zIndex: 1, // Below the sword
        backgroundColor: "#134611",
        paddingHorizontal: 0,
        paddingVertical: 125

    },
    
    characterImage: {
        width: 250, 
        height: 250,
        left:40,
        bottom: -200,
        resizeMode: "contain",
    },
    
    swordContainer: {
        position: "absolute",
        left: 20,  // Adjust sword placement
        bottom: 275, // Raise sword higher to match character's hand
        zIndex: 3, // Ensures it's above character
    },
    
    swordImage: {
        width: 75, // Adjust size as needed
        height: 75,
        resizeMode: "contain",
    },

    heartContainer: {
        position: "absolute",
        left: 20,  // Adjust sword placement
        bottom: 375, // Raise sword higher to match character's hand
        zIndex: 3, // Ensures it's above character
    },
    
    heartImage: {
        width: 75, // Adjust size as needed
        height: 75,
        resizeMode: "contain",
    },

    skillPointsContainer: {
        position: "absolute",
        top: 120,
        backgroundColor: "#134611",
        padding: 10,
        borderRadius: 5,
    },
    skillText: {
        fontSize: 20,
        color: "#fff",
    },
    statsContainer: {
        position: "absolute",
        top: 200,
        alignItems: "center",
        zIndex: 3,
    },
    statRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },

    statButton: {
        backgroundColor: "#134611",
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    statButtonText: {
        color: "#fff",
        fontSize: 20,
    },
    statValue: {
        fontSize: 20,
        color: "#fff",
    },
    
});

export default LessonScreen;

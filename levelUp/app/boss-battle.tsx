import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import Blitz from '../assets/images/blitz.png';
import Blitz_Attack1 from '../assets/images/blitz_attack1.png';
import Blitz_Attack2 from '../assets/images/blitz_attack2.png';
import Boss1 from '../assets/images/Boss1.png';
import Boss1_Attack1 from '../assets/images/Boss1_attack1.png';
import Boss1_Attack2 from '../assets/images/Boss1_attack2.png';
import Boss1_Attack3 from '../assets/images/Boss1_attack3.png';
import Background from '../assets/images/battle_background.png';
import Sword from '../assets/images/sword.png';
import Heart from '../assets/images/heart.png';

const BossBattleScreen: React.FC = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const params = route.params as { hp?: number; attack?: number } || {};
    const playerMaxHp = params.hp ?? 5;
    const playerAttack = params.attack ?? 5;

    const generateBossStats = () => {
        const hp = Math.floor(Math.random() * 9) + 1; // Random number between 1 and 9
        const attack = 10 - hp; // Ensure total stats always equal 10
        return { hp, attack };
    };
    
    const [bossStats] = useState(generateBossStats());
    const bossMaxHp = bossStats.hp;
    const bossAttack = bossStats.attack;

    const [playerCurrentHp, setPlayerCurrentHp] = useState(playerMaxHp);
    const [bossCurrentHp, setBossCurrentHp] = useState(bossMaxHp);
    const [battleMessage, setBattleMessage] = useState("Battle begins!");
    const [playerFrame, setPlayerFrame] = useState(Blitz);
    const [bossFrame, setBossFrame] = useState(Boss1);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [battleActive, setBattleActive] = useState(true);
    const [showHomeButton, setShowHomeButton] = useState(false);


    useEffect(() => {
        if (!battleActive) {
            setShowHomeButton(true);
        }
    }, [battleActive]);

    const attackSequence = useCallback(async () => {
        if (!battleActive) return;

        if (isPlayerTurn) {
            setBattleMessage("You attack!");
            setPlayerFrame(Blitz_Attack1);
            await new Promise(resolve => setTimeout(resolve, 500));
            setPlayerFrame(Blitz_Attack2);
            await new Promise(resolve => setTimeout(resolve, 500));

            setBossCurrentHp(prev => {
                const newHp = Math.max(0, prev - playerAttack);
                if (newHp === 0) {
                    setBattleMessage("You defeated the boss!");
                    setBattleActive(false);
                }
                return newHp;
            });
            setPlayerFrame(Blitz);
            setTimeout(() => setIsPlayerTurn(false), 1000);
        } else {
            setBattleMessage("Boss attacks!");
            setBossFrame(Boss1_Attack1);
            await new Promise(resolve => setTimeout(resolve, 500));
            setBossFrame(Boss1_Attack2);
            await new Promise(resolve => setTimeout(resolve, 500));
            setBossFrame(Boss1_Attack3);
            await new Promise(resolve => setTimeout(resolve, 500));

            setPlayerCurrentHp(prev => {
                const newHp = Math.max(0, prev - bossAttack);
                if (newHp === 0) {
                    setBattleMessage("You were defeated...");
                    setTimeout(() => setBattleMessage("Try again tomorrow"), 3000);
                    setBattleActive(false);
                }
                return newHp;
            });
            setBossFrame(Boss1);
            setTimeout(() => setIsPlayerTurn(true), 1000);
        }
    }, [isPlayerTurn, battleActive, playerAttack, bossAttack]);

    useEffect(() => {
        if (battleActive) {
            attackSequence();
        }
    }, [isPlayerTurn, battleActive, attackSequence]);

    return (
        <ImageBackground
        source={Background} style={styles.background} imageStyle={styles.backgroundImage}>

            {/* Player Stats */}
            <View style={styles.playerStats}>
                <Text style={styles.heartStatsText}>{playerCurrentHp}</Text>
                <Text style={styles.attackStatsText}>{playerAttack}</Text>
            </View>

            {/* Boss Stats */}
            <View style={styles.bossStats}>
                <Text style={styles.bossHeartStatsText}>{bossCurrentHp}</Text>
                <Text style={styles.bossAttackStatsText}>{bossAttack}</Text>
            </View>

            {/* Battle Message */}
            <View style={styles.battleMessageContainer}>
                <Text style={styles.battleMessage}>{battleMessage}</Text>
            </View>

             {/* Player Character */}
             <View style={styles.characterContainer}>
                <Image 
                    source={playerFrame} 
                    style={[styles.characterImage, playerCurrentHp === 0 ? { transform: [{ rotate: '90deg' }] } : null]} 
                />
            </View>

            {/* Boss Character */}
            <View style={styles.bossContainer}>
                <Image 
                    source={bossFrame} 
                    style={[styles.bossImage, bossCurrentHp === 0 ? { transform: [{ rotate: '-90deg' }] } : null]} 
                />
            </View>

            {/* Character and UI Elements */}
            <View style={styles.swordContainer}>
                <Image source={Sword} style={styles.swordImage} />
            </View>

            <View style={styles.heartContainer}>
                <Image source={Heart} style={styles.heartImage} />
            </View>

            <View style={styles.bossHpContainer}>
                <Image source={Heart} style={styles.heartImage} />
            </View>

            {/* Boss Attack */}
                <View style={styles.bossAttackContainer}>
                    <Image source={Sword} style={styles.swordImage} />
                </View>

            {/* Back to Home Button */}
            {showHomeButton && (
                <TouchableOpacity 
                    style={styles.homeButton} 
                    onPress={() => navigation.navigate('battle')}
                >
                    <Text style={styles.homeButtonText}>Back to Home</Text>
                </TouchableOpacity>
            )}



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

    bottomRight: {
        position: "absolute",
        bottom: 75, // Adjust to move higher or lower
        right: 20,  // Adjust for more spacing from the right
    },

    homeButton: {
        position: 'absolute',
        top: 215,
        alignSelf: 'center',
        backgroundColor: '#134611',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    homeButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },

    playerStats: {
        position: "absolute",
        bottom: 300,
        left: 20,
    },

    heartStatsText: {
        fontSize: 50,
        color: "white",
        fontWeight: "bold",
        left: 28,
        bottom: -40, // Adjust this value for better visibility
        zIndex: 5,
    },
    

    attackStatsText: {
        fontSize: 50,
        color: "white",
        fontWeight: "bold",
        left: 105,
        bottom: 23,
        zIndex: 5,

    },

    bossHpContainer: {
        position: "absolute",
        bottom: 300,  // Adjust for visibility
        right: 20, // Keep it on the boss side
        flexDirection: "row", // Align hearts horizontally
        alignItems: "center",
        backgroundColor: "black", 
        paddingHorizontal: 5,
        paddingVertical: 50,
    },
    
    bossAttackContainer: {
        position: "absolute",
        bottom: 300, // Separate from HP
        right: 100,
        flexDirection: "row", // Align swords horizontally
        alignItems: "center",
        backgroundColor: "black", 
        paddingHorizontal: 5,
        paddingVertical: 50,
    },

    bossStats: {
        position: "absolute",
        bottom: 150,
        right: 20,
        padding: 10,
        borderRadius: 5,
    },

    bossHeartStatsText: {
        fontSize: 50,
        color: "white",
        fontWeight: "bold",
        right: 15,
        bottom: 105, // Adjust this value for better visibility
        zIndex: 5,
    },

    bossAttackStatsText: {
        fontSize: 50,
        color: "white",
        fontWeight: "bold",
        right: 100,
        bottom: 163,
        zIndex: 5,
    },

    battleMessageContainer: {
        position: "absolute",
        top: 150,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 5,
    },

    battleMessage: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
    }, 

    characterContainer: {
        position: "absolute",
        left: 0, // Adjust based on your layout
        bottom: 75, // Adjust height positioning
        zIndex: 1, // Below the sword

    },
    
    characterImage: {
        width: 250, 
        height: 250,
        left:0,
        bottom: -50,
        resizeMode: "contain",
    },

    bossContainer: {
        position: "absolute",
        bottom: 100,
        zIndex: 1, // Below the sword

    },
    
    bossImage: {
        width: 200, 
        height: 200,
        left:100,
        resizeMode: "contain",
    },
    
    swordContainer: {
        position: "absolute",
        left: 100,  // Adjust sword placement
        bottom: 300, // Raise sword higher to match character's hand
        backgroundColor: "#134611",
        paddingHorizontal: 5,
        paddingVertical: 50,
        zIndex: 3, // Ensures it's above character
    },
    
    swordImage: {
        width: 75, // Adjust size as needed
        height: 75,
        bottom: 45,
        resizeMode: "contain",
    },

    heartContainer: {
        position: "absolute",
        left: 20,  // Adjust sword placement
        bottom: 300, // Raise sword higher to match character's hand
        backgroundColor: "#134611",
        paddingHorizontal: 5,
        paddingVertical: 50, 
        zIndex: 3, // Ensures it's above character
    },
    
    heartImage: {
        width: 75, // Adjust size as needed
        height: 75,
        bottom: 45, 
        resizeMode: "contain",
    },
});

export default BossBattleScreen;

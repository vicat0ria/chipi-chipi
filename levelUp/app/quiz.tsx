import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Quiz() {
    const route = useRoute();
    const navigation = useNavigation();
    const { data } = route.params || {};

    const letters = ['A', 'B', 'C', 'D'];
    const [currentLetter, setCurrentLetter] = useState('');
    const [xp, setXp] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [xpIncreased, setXpIncreased] = useState(false); // To track if XP has been increased already

    // Use useFocusEffect to update the random letter when the screen comes into focus
    useFocusEffect(
        useCallback(() => {
            setCurrentLetter(letters[Math.floor(Math.random() * letters.length)]);
        }, [])
    );

    // Use Effect hook to update XP whenever `data` changes
    useFocusEffect(() => {
        if (data === true && !xpIncreased) {
            setXp(prevXp => prevXp + 10); // Increase XP when answer is correct
            setXpIncreased(true); // Set xpIncreased to true to prevent multiple increments
        }
    });

    const handleNextAttempt = () => {
        // Increment the attempts count
        setAttempts(prevAttempts => prevAttempts + 1);
        
        // Reset xpIncreased when moving to the next attempt
        setXpIncreased(false);

        // Check if XP >= 50 or attempts >= 10
        if (xp >= 50 || attempts + 1 >= 10) {
            // Navigate to index when either condition is met
            navigation.navigate("(tabs)");
        } else {
            // Otherwise, go to the camera screen
            navigation.navigate("camera", { letter: currentLetter });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.xpText}>XP: {xp}</Text>
            <View style={styles.card}>
                <Text 
                    style={[
                        styles.title, 
                        { color: data === true ? '#28A745' : data === false ? '#DC3545' : '#333' }
                    ]}
                >
                    {data === true ? 'Perfect!' : data === false ? 'Oops! Try again' : 'Welcome'}
                </Text>

                <Text style={styles.subtitle}>Sign the letter:</Text>
                <View style={styles.letterContainer}>
                    <Text style={styles.letter}>{currentLetter}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleNextAttempt}>
                    <Text style={styles.buttonText}>{data ? "Next Sign" : "Sign Now"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F4F4F4",
        padding: 20,
    },
    xpText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#3DA35D",
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#fff",
        padding: 30,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignItems: "center",
        width: "90%",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: "#666",
        marginBottom: 10,
    },
    letterContainer: {
        backgroundColor: "#3DA35D",
        padding: 20,
        borderRadius: 10,
        marginVertical: 15,
        minWidth: 80,
        alignItems: "center",
        justifyContent: "center",
    },
    letter: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
    },
    button: {
        backgroundColor: "#3DA35D",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
        shadowColor: "#3DA35D",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
});

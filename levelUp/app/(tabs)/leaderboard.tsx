import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const friendsLeaderboard = [
  { place: 1, name: "Alice", xp: 50 },
  { place: 2, name: "Bob", xp: 1100 },
  { place: 3, name: "Charlie", xp: 1000 },
];

const globalLeaderboard = [
  { place: 1, name: "Zara", xp: 5000 },
  { place: 2, name: "Liam", xp: 4800 },
  { place: 3, name: "Mia", xp: 4500 },
];

export default function LeaderboardScreen() {
  return (
    
    <View style={styles.container}>
      <Text style={styles.leadTitle}>Leaderboard</Text>
      <Text style={styles.title}>Friends Leaderboard</Text>
      {friendsLeaderboard.map((item) => (
        <View key={item.place} style={styles.row}>
          <Text style={styles.cell}>{`#${item.place}`}</Text>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>{`${item.xp} Lvl`}</Text>
        </View>
      ))}

      <Text style={styles.title}>Global Leaderboard</Text>
      {globalLeaderboard.map((item) => (
        <View key={item.place} style={styles.row}>
          <Text style={styles.cell}>{`#${item.place}`}</Text>
          <Text style={styles.cell}>{item.name}</Text>
          <Text style={styles.cell}>{`${item.xp} Lvl`}</Text>
        </View>
      ))}
    <TouchableOpacity 
      style={styles.button} 
    >
      <Text style={styles.buttonText}>Share with Friends!   ➦</Text>
    </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  leadTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3DA35D',
    marginBottom: 20,
    marginTop: 100,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginVertical: 10,
    textAlign: "center",
    marginTop: 40
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    fontSize: 18,
    color: "black",
  },
  button: {
    backgroundColor: '#3DA35D',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 30,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

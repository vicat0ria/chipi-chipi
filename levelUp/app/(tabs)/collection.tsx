import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CollectionsScreen() {
  return (
    
    <View style={styles.container}>
      <Text style={styles.leadTitle}>Collection</Text>



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

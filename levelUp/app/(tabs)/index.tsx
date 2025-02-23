// // index.tsx
// import React from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
// import { useNavigation } from '@react-navigation/native';

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   return (
//     <View>
//       <Text style={styles.predictionText}>Home Screen</Text>
//       <Button
//         title="Play"
//         onPress={() => navigation.navigate('Battle')} // Navigate to TempScreen
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   predictionText: {
//     marginTop: 100,
//     fontSize: 18,
//     color: "white",
//   },
// });

// export default HomeScreen;

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook

const YourComponent = () => {
  const navigation = useNavigation(); // Get the navigation object

  return (
    <View style={styles.container}>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('temp')} // Navigate to "explore"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100, // Apply margin
  },
});

export default YourComponent;

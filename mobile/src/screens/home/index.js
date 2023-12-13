import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavigationIcon from '../../components/BottomNavigation'; // Import the BottomNavigationIcon component

const HomeScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to the Home Screen!</Text>
        {/* Include the BottomNavigationIcon at the bottom of the screen */}
        
      </View>
      <BottomNavigationIcon />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default HomeScreen;

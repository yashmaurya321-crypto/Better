import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Home = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Remove remembered user
      await AsyncStorage.removeItem('user');
      
      // Show logout success message
      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have been successfully logged out'
      });

      // Navigate back to Login screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'An error occurred during logout');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home!</Text>
      
      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={() => {
          Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Logout', 
                style: 'destructive',
                onPress: handleLogout
              },
            ]
          );
        }}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2196F3',
  },
  logoutButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
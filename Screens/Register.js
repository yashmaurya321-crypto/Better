import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, KeyboardAvoidingView , Platform} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Register = ({ navigation }) => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.username) newErrors.username = 'Name is required';
    if (!formValues.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formValues.email)) newErrors.email = 'Please enter a valid email address';
    if (!formValues.password) newErrors.password = 'Password is required';
    else if (formValues.password.length < 8) newErrors.password = 'Password must be at least 8 characters long';
    else if (!/[A-Z]/.test(formValues.password)) newErrors.password = 'Password must contain at least one uppercase letter';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormValues(prevState => ({
      ...prevState,
      [field]: value
    }));

    validateForm(); 
  };

  const handleRegister = async () => {
    if (!validateForm()) return; 

    console.log("Form Submitted", formValues);
try{
  const storedUsers = await AsyncStorage.getItem('users');
  const users = storedUsers ? JSON.parse(storedUsers) : [];

  users.push({ name : formValues.username,email : formValues.email, password : formValues.password });

 
  await AsyncStorage.setItem('users', JSON.stringify(users));
  Alert.alert('Signup Successful!');
  navigation.navigate('Login');
}catch(error){
    console.log(error);
}
   
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
      <Text style={styles.title} accessible={true} accessibilityRole="header">Register</Text>

      <View style={styles.imageContainer}>
        <Image source={require('../assets/Register.png')} style={styles.image}  accessible={true}
          accessibilityLabel="Illustration of registration"/>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#999"
          value={formValues.username}
          onChangeText={(value) => handleChange('username', value)}
          accessible={true}
          accessibilityLabel="Enter your name"
          accessibilityHint="Type your full name here"
        />
        {errors.username && <Text style={styles.errorText}  accessibilityRole="alert">{errors.username}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={formValues.email}
          onChangeText={(value) => handleChange('email', value)}
          accessible={true}
          accessibilityLabel="Enter your email address"
          accessibilityHint="Type your email address in valid format"
        />
        {errors.email && <Text style={styles.errorText} accessibilityRole="alert">{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={formValues.password}
          onChangeText={(value) => handleChange('password', value)}
          accessible={true}
          accessibilityLabel="Enter your password"
          accessibilityHint="Password must be at least 8 characters with one uppercase letter"
        />
        {errors.password && <Text style={styles.errorText} accessibilityRole="alert">{errors.password}</Text>}
      </View>

      <TouchableOpacity style={styles.button} accessibilityRole="button"
        accessibilityLabel="Register button"
        accessibilityHint="Submit the form to register your account" onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity  accessible={true}
          accessibilityRole="link"
          accessibilityLabel="Navigate to login screen"
          accessibilityHint="Tap to go to the login screen" onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '95%',
  },
  input: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 40,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  loginText: {
    color: '#333',
  },
  loginLink: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});

export default Register;

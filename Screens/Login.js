import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  ScrollView 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useFocusEffect } from '@react-navigation/native';
const Login = ({ navigation }) => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
const [users, setUsers] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    checkRememberedUser();
  }, []);
  const checkRememberedUser = async () => {
    try {
      const rememberedUser = await AsyncStorage.getItem('rememberedUser');
      if (rememberedUser) {
        const user = JSON.parse(rememberedUser);
        setFormValues({
          email: user.email,
          password: user.password
        });
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Error checking remembered user:', error);
    }
  };
const fetchusers = async()=>{
  const storedUsers = await AsyncStorage.getItem('users')
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers))
      }else {
        setUsers([])
      }
}
  useFocusEffect(
    useCallback(() => {
    fetchusers()
    }, [])
  );
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (!formValues.email) newErrors.email = 'Email is required';
    if (!formValues.password) newErrors.password = 'Password is required';

    if (formValues.email && !emailRegex.test(formValues.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formValues.password && formValues.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const user = users.find(
        (user) => user.email === formValues.email && user.password === formValues.password
      );

      if (user) {
        if (rememberMe) {
          try {
            await AsyncStorage.setItem('rememberedUser', JSON.stringify({
              email: formValues.email,
              password: formValues.password
            }));
          } catch (error) {
            console.error('Error storing remembered user:', error);
          }
        } else {
          try {
            await AsyncStorage.removeItem('rememberedUser');
          } catch (error) {
            console.error('Error removing remembered user:', error);
          }
        }
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
          }
    } catch (error) {
      console.error(error);
   Alert.alert('Login Failed', 'An error occurred during login');
    }
  };
  const handleChange = (field, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: undefined
      }));
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Login</Text>

      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/Register.png')} 
          style={styles.image} 
           accessibilityRole="image"
          accessibilityLabel="Illustration of registration"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input, 
            errors.email && styles.inputError
          ]}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={formValues.email}
          onChangeText={(value) => handleChange('email', value)}
            accessibilityLabel="Email address input"
  accessibilityHint="Enter your registered email address"
        />
        {errors.email && <Text  accessibilityRole="alert" style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[
            styles.input, 
            errors.password && styles.inputError
          ]}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={formValues.password}
          onChangeText={(value) => handleChange('password', value)}
              accessibilityLabel="Password input"
          accessibilityHint="Enter your password"
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <View style={styles.rememberContainer}>
        <BouncyCheckbox
  isChecked={rememberMe}
  onPress={(isChecked) => setRememberMe(isChecked)}
  accessibilityRole="checkbox"
            accessibilityLabel="Remember Me"
            accessibilityHint="Check this box to remember your login details for next time"
/>
          <Text style={styles.rememberText}>Remember Me</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin}
        accessibilityRole="button"
        accessibilityLabel="Login button"
        accessibilityHint="Press to log in"
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerLinkContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <TouchableOpacity  accessibilityRole="link"
          accessibilityLabel="Navigate to Register screen"
          accessibilityHint="Press to create a new account" onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    borderRadius: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  rememberContainer: {
 flexDirection: 'row',
    margin : 10
  },
  rememberText: {
    marginLeft: 10,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    width: '95%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerLinkContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    color: '#333',
  },
  registerLink: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

export default Login;
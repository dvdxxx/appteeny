import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleLogin = () => {
    // Basic validation checks
    if (!username) {
      setValidationError('Username is required');
      return;
    }
    if (!password) {
      setValidationError('Password is required');
      return;
    }

    // In a real app, you would make an API call to validate the credentials.
    // For simplicity, we'll assume the login is successful if validation checks pass.

    setUsername(''); // Clear username
    setPassword(''); // Clear password
    setValidationError(''); // Clear validation error
    navigation.replace('Home'); // Redirect to Home screen
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  const handleInstagramLogin = () => {
    // Handle Instagram login logic here
  };

  const handleMicrosoftLogin = () => {
    // Handle Microsoft login logic here
  };

  const handleForgotPassword = () => {
    // Implement the logic for forgot password here
    // You can navigate to a "Forgot Password" screen or show a dialog to reset the password.
  };
  const handleRegister = () => {
    navigation.navigate('Sign-up');
    // Implement the logic for forgot password here
    // You can navigate to a "Forgot Password" screen or show a dialog to reset the password.
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputField}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={validationError.includes('Username')}
          helperText={validationError}
        />
      </View>
      <View style={styles.inputField}>
        <TextField
          type='password'
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={validationError.includes('Password')}
          helperText={validationError}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </View>

      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View>
        
      <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginOptionContainer}>
        <Button
          variant="outlined"
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
        <Button
          variant="outlined"
          onClick={handleInstagramLogin}
        >
          Login with Instagram
        </Button>
        <Button
          variant="outlined"
          onClick={handleMicrosoftLogin}
        >
          Login with Microsoft
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    marginBottom: 16,
    width: 250,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  loginOptionContainer: {
    marginTop: 16,
  },
  forgotPasswordContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  forgotPasswordText: {
    color: 'black',
    fontSize: 10,
    textDecorationLine: 'underline',
  },
  registerText: {
    color: 'black',
    fontSize: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

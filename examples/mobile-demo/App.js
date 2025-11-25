import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

// Configure your hosted auth URL (this would be your deployed web-demo)
const HOSTED_AUTH_URL = 'http://localhost:3000'; // Replace with your deployed URL

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authConfig = {
    region: 'us-east-1',
    userPoolId: 'us-east-1_jGBVs2HIq',
    userPoolClientId: '4q6uc7bco8ud3g7nkgq3h6lqe6',
    apiEndpoint: 'https://o5pjniukhl.execute-api.us-east-1.amazonaws.com/prod',
    requireEmailVerification: true,
    enablePersonaSelection: true,
    theme: {
      primaryColor: '#667eea',
      companyName: 'My Mobile App'
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      
      // Encode config for URL
      const configParam = btoa(JSON.stringify(authConfig));
      const authUrl = `${HOSTED_AUTH_URL}?mode=mobile&config=${configParam}`;
      
      // Open hosted auth in browser
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        'myapp://auth-callback'
      );
      
      if (result.type === 'success') {
        // Parse the returned URL for auth data
        const url = new URL(result.url);
        const token = url.searchParams.get('token');
        const userData = url.searchParams.get('user');
        
        if (token && userData) {
          const parsedUser = JSON.parse(decodeURIComponent(userData));
          setUser(parsedUser);
          Alert.alert('Success', 'Login successful!');
        }
      } else if (result.type === 'cancel') {
        Alert.alert('Cancelled', 'Login was cancelled');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    Alert.alert('Logged Out', 'You have been logged out successfully');
  };

  if (user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.dashboardContainer}>
          <Text style={styles.title}>Welcome to My Mobile App! 🎉</Text>
          
          <View style={styles.userCard}>
            <Text style={styles.userTitle}>User Information</Text>
            <Text style={styles.userInfo}>Email: {user.email}</Text>
            <Text style={styles.userInfo}>ID: {user.id}</Text>
            <Text style={styles.userInfo}>
              Status: {user.emailVerified ? '✅ Verified' : '⚠️ Pending'}
            </Text>
            {user.persona && (
              <Text style={styles.userInfo}>
                Account: {user.persona === 'seller' ? '🏪 Seller' : '🛒 Buyer'}
              </Text>
            )}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authContainer}>
        <Text style={styles.title}>My Mobile App</Text>
        <Text style={styles.subtitle}>
          Secure authentication powered by Universal Auth Module
        </Text>
        
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Opening Auth...' : 'Login / Register'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.description}>
          This will open our hosted authentication pages where you can:
          {'\n'}• Create a new account
          {'\n'}• Login to existing account
          {'\n'}• Reset your password
          {'\n'}• Verify your email
          {'\n'}• Choose account type (Buyer/Seller)
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  dashboardContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
    lineHeight: 20,
  },
  loginButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 30,
    alignSelf: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  userInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});
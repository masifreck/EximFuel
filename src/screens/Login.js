import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('⚠️ Missing Fields', 'Please enter username and password');
      return;
    }

    // 🔐 Dummy validation (replace with API later)
    if (username === 'admin' && password === '1234') {
      try {
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('username', username);

        navigation.replace('dashboard');
      } catch (error) {
        Alert.alert('❌ Error', 'Failed to save login session');
      }
    } else {
      Alert.alert('❌ Login Failed', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      {/* 🏢 Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/EL-logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>Login to continue 🚀</Text>
      </View>

      {/* 🔑 Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="👤 Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="🔒 Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login 🔐</Text>
        </TouchableOpacity>
      </View>

      {/* ⚡ Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by <Text style={{ fontWeight: 'bold' }}>Tranzol 🚚</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    justifyContent: 'space-between',
  },

  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },

  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  inputContainer: {
    paddingHorizontal: 30,
  },

  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginVertical: 10,
    elevation: 2,
  },

  loginBtn: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },

  loginText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },

  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  footerText: {
    fontSize: 12,
    color: '#888',
  },
});

export default Login;

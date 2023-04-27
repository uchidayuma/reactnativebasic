import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
const auth = getAuth();

const PasswordResetScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (email === '') {
      Alert.alert('error', 'input your email');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('password reset', 'check your email');
    } catch (error) {
      Alert.alert('error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Reset</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <Button mode='contained' onPress={handleResetPassword}>send password reset mail</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
});

export default PasswordResetScreen;
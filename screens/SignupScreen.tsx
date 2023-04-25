import { useEffect, useState } from "react";
import { Platform, StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";

import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { gstyle } from "../constants/Styles";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export default function SignupScreen({ navigation }: RootTabScreenProps<'Signup'>) {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = () => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  const isValidPassword = () => password.length >= 8;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    input: {
      marginBottom: 20,
    },
    button: {
      marginTop: 20,
    },
    error: {
      color: 'red',
      marginTop: 10,
      textAlign: 'center',
    },
    form: {
      justifyContent: 'center',
    },
  });

  const handleSignUp = async() => {
    try {
      const signupUser = await createUserWithEmailAndPassword(auth, email, password)
      console.log(signupUser);
      navigation.navigate('Setting');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
        />
        <HelperText type="error" visible={!isValidEmail()}>
          Email address is invalid!
        </HelperText>
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
        <HelperText type="error" visible={!isValidPassword()}>
          Password must be at least 8 characters long!
        </HelperText>
        <Button mode="contained" onPress={handleSignUp} style={styles.button} disabled={!isValidEmail() || !isValidPassword()}>Sign Up</Button>
        <Button mode="text" onPress={() => navigation.navigate('Signin')} style={styles.button}>Already have an account? Signin</Button>
      </View>
    </KeyboardAvoidingView>
  );
} 
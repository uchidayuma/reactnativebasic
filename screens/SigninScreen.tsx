import { useEffect, useState, useContext } from "react";
import { Platform, StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { gstyle } from "../constants/Styles";
import AuthContext from "../contexts/AuthContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export default function SigninScreen({ navigation }: RootTabScreenProps<'Signin'>) {
  const colorScheme = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(AuthContext);

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

  const handleSignIn = async() => {
    try {
      const signInUser = await signInWithEmailAndPassword(auth, email, password);
      setUser(signInUser.user);
      await AsyncStorage.setItem('user', JSON.stringify(signInUser.user));
      console.log(signInUser);
      alert('Success, Signed in successfully');
      navigation.navigate('Home');
    } catch (error) {
      console.log(error.code, error.message);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />
        <Button mode="contained" onPress={handleSignIn} style={styles.button} disabled={!isValidEmail() || !isValidPassword()}>Sign In</Button>
        {/* forgot password */}
        <Button mode="text" onPress={() => navigation.navigate('PasswordReset')} style={styles.button}>Forgot Password?</Button>
        {/* アカウント持っていない場合 */}
        <Button mode="text" onPress={() => navigation.navigate('Signup')} style={styles.button}>Don't have an account? Sign Up</Button>
      </View>
    </KeyboardAvoidingView>
  );
} 
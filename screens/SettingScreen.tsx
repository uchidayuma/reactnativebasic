import { useEffect, useState, useContext } from "react";
import { Platform, StyleSheet, View, Text, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import AuthContext from "../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { gstyle } from "../constants/Styles";
import { getAuth, signOut } from "firebase/auth";
import Colors from "../constants/Colors";
const auth = getAuth();

import { db, exportDatabaseToJson } from "../helpers/sqlite";

import { BillingModal } from "../components/BillingModal";

export default function SettingScreen({ navigation }: RootTabScreenProps<'Setting'>) {
  const colorScheme = useColorScheme();
  const { user, setUser, isPremium, restoreUser } = useContext(AuthContext);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button : {
      margin: 15,
    }
  });

  const handleSignout = async() => {
    await signOut(auth);
    await setUser(null);
    await AsyncStorage.removeItem('user');
    restoreUser();
    navigation.navigate('Home');
    alert('Signed out');
  }

  const handleBackup = async() => {
    await exportDatabaseToJson(db, user.uid);
    alert('Backup done');
  }

  const authSection = () => {
    if(user){
      return(
        <>
          <Text>{user.email}</Text>
          {/* <BillingModal /> */}
          {/* firebase signout */}
          <Button mode="contained" buttonColor={Colors[colorScheme].subColor} style={styles.button} onPress={handleSignout}>Signout</Button>
        </>
      )
    }else{
      return(
        <>
          <Button mode="contained" buttonColor={Colors[colorScheme].mainColor} style={styles.button} onPress={() => navigation.navigate('Signin')}>Signin</Button>
          <Button mode="contained" buttonColor={Colors[colorScheme].subColor} style={styles.button} onPress={() => navigation.navigate('Signup')}>Signup</Button>
        </>
      )
    }
  }
  const planSection = () => {
    if(!user){
      return <Text>Premium plan required Sign up</Text>
    }else{
      // return <BillingModal /> 
    }
  }
  const premiumSection = () => {
    if(isPremium || true){
      // return premium user backup button
      return <>
        <TouchableOpacity onPress={handleBackup}>
          <Button mode="contained" buttonColor={Colors[colorScheme].subColor} style={styles.button}>Backup</Button>
        </TouchableOpacity>
      </>
    }else{
      return <></>
    }
  }

  return (
    <View style={gstyle.bgimage}>
      <Text style={gstyle.heading}>Setting Screen</Text>
      {authSection()}
      <Text style={gstyle.heading}>Subscription Plans</Text>
      {planSection()}
      {premiumSection()}
    </View>
  );
} 
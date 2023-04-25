import { useEffect, useState } from "react";
import { Platform, StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";

import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { gstyle } from "../constants/Styles";

// import { BillingModal } from "../components/BillingModal";

export default function SettingScreen({ navigation }: RootTabScreenProps<'Setting'>) {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });

  return (
    <View style={styles.container}>
      <Text style={gstyle.heading}>Setting Screen</Text>
      <Button onPress={() => navigation.navigate('Signin')}>Signin</Button>
      <Button onPress={() => navigation.navigate('Signup')}>Signup</Button>
      {/* <BillingModal /> */}
    </View>
  );
} 
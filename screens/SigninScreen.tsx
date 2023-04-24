import { useEffect, useState } from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";

import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { gstyle } from "../constants/Styles";

export default function SigninScreen({ navigation }: RootTabScreenProps<'Signin'>) {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });

  return (
    <View style={styles.container}>
      <Text style={gstyle.heading}>Signin Screen</Text>
    </View>
  );
} 
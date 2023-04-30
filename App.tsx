import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import Purchases from 'react-native-purchases';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AuthProvider from './contexts/AuthProvider';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Colors from './constants/Colors';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  console.log(colorScheme);

  const styles = StyleSheet.create({
    appbar: {
      backgroundColor: Colors[colorScheme].subColor,
    },
    content: {
      color: Colors[colorScheme].text
    }
  })
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#D7B17D',
      // primary: '#D7B17D',
      accent: '#64A2CF',
    },
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <Appbar.Header style={styles.appbar}>
              <Appbar.Action icon="book" color={Colors[colorScheme].text} onPress={() => {}} />
              <Appbar.Content color={Colors[colorScheme].text} title="TapDiary" />
            </Appbar.Header>
            <Navigation colorScheme={colorScheme} />
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    );
  }
}

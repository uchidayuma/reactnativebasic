import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import Purchases from 'react-native-purchases';

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

  useEffect( () => {
    rcinit();
  }, [])

  const rcinit = async () => {
    if (Platform.OS === 'ios') {
      await Purchases.configure({ apiKey: '' });
    } else if (Platform.OS === 'android') {
      await Purchases.configure({ apiKey: 'goog_QfyvSnfrGobMgexckUksOUkmRZG' });
    }
  }
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Action icon="book" color={Colors[colorScheme].text} onPress={() => {}} />
          <Appbar.Content color={Colors[colorScheme].text} title="TapDiary" />
        </Appbar.Header>
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Appbar.Header>
          <Appbar.Action icon="book" onPress={() => {}} />
          <Appbar.Content title="TapDiary" />
        </Appbar.Header>
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}

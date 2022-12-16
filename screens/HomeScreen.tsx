import { StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { createTable, insert, select } from '../helpers/sqlite';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  createTable(); // 「diaries」というテーブル作成
  select();
  
  return (
    <ScrollView>
      {/* HTMLで言うと、Sectionや/DIVタグに近い */}
      <View>
        <Text style={styles.title}>Welcomeパネル</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Past Diaries</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Diary Tips</Text>
      <View>
        <View>
          <Text>Tips1</Text>
        </View>
        <View>
          <Text>Tips2</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { createTable, insert, select } from '../helpers/sqlite';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  createTable(); // 「sample_table」というテーブル作成
  insert(1, "Taro"); // 「id=1, name=Taro」のデータを登録
  insert(2, "Jiro"); // 「id=2, name=Jiro」のデータを登録
  select(); // データを取得してログに表示

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
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

import { StyleSheet, ScrollView, Image, ImageBackground, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { gstyle } from '../constants/Styles';

import dayjs from 'dayjs';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { createTable, select } from '../helpers/sqlite';

import { Diaries } from '../components/Diaries';
import { hourMessage } from '../helpers/fuctions';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  createTable(); // 「diaries」というテーブル作成
  const [diaries, setDiaries] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const welcomeMessage: string = hourMessage();
  useEffect( () =>{
    console.log('useEffect: Home')
    // SQLiteから取ってくる処理
    init();
  }, [])

  const init = async() => {
    // SQLiteから最新日記5件を取ってくる
    // awaitを使って、日記がDBから取れる待つ
    const results: string[] = await select();
    // 取れたデータをStateにセット
    await setDiaries(results);
    setRefreshing(false);
    console.log('diaries: state');
    console.log(diaries);
  }

  console.log(dayjs().format('H'))
  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={init} />
      }
    >
      <ImageBackground source={require('../assets/images/background2.jpeg')} resizeMode="cover" style={gstyle.bgimage}>
      {/* HTMLで言うと、Sectionや/DIVタグに近い */}
        <View>
          <Image source={require('../assets/images/welcome.png')} />
          <Text>{ dayjs().format('YYYY-MM-DD')}</Text>
          <Text style={gstyle.heading}>{welcomeMessage}</Text>
          <Button icon="note" mode="contained" onPress={() => navigation.navigate('Create')}>Check In</Button>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={gstyle.heading}>Past Diaries</Text>
        <Diaries items={diaries} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={gstyle.heading}>Diary Tips</Text>
        <View>
          <View onTouchEnd={ () => navigation.navigate('Webview', {url: 'https://tapdiary.net/we-philosophy/'})}>
            <Image source={require('../assets/images/tips1.png')} />
            <Text>App Philosophy</Text>
          </View>
          <View onTouchEnd={ () => navigation.navigate('Webview', {url: 'https://tapdiary.net/about-2/'})}>
            <Image source={require('../assets/images/tips2.png')} />
            <Text>Diary Benefits</Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
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

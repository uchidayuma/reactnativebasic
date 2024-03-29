import { StyleSheet, ScrollView, Image, ImageBackground, RefreshControl } from 'react-native';
import { Button } from 'react-native-paper';
import { useState, useEffect, useContext } from 'react';
import { gstyle } from '../constants/Styles';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

import dayjs from 'dayjs';
import AuthContext from '../contexts/AuthContext';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { createTable, select } from '../helpers/sqlite';

import { Diaries } from '../components/Diaries';
import { hourMessage } from '../helpers/fuctions';
import { Banner } from '../components/Banner';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const colorScheme = useColorScheme();
  const { user, setUser } = useContext(AuthContext);
  const styles = StyleSheet.create({
    welcome: {
      borderColor: '#FFF',
      backgroundColor: Colors[colorScheme].backGroundColor,
      // backgroundColor: Colors[light].backGroundColor,
      marginTop: 20,
      borderRadius: 10,
      width: '80%',
      marginHorizontal: '10%',
      padding: 20
    },
    welcomeText: {
      textAlign: 'center',
      marginBottom: 10,
    },
    welcomeButton: {
      backgroundColor: Colors[colorScheme].mainColor
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    tips: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    tipsCard: {
      width: '40%',
      padding: 15,
      borderRadius: 15,
      marginBottom: 20,
      backgroundColor: Colors[colorScheme].backGroundColor
    },
    tipsImage:{
      width: '80%',
      marginHorizontal: '10%',
      marginBottom: 10,
    },
    tipsText: {
      color: Colors[colorScheme].text,
      textAlign: 'center',
    }
  });
  createTable(); // 「diaries」というテーブル作成
  const [diaries, setDiaries] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const welcomeMessage: string = hourMessage();
  useEffect( () =>{
    console.log('useEffect: Home')
    // SQLiteから取ってくる処理
    init();
  }, [])

  useEffect( () =>{
    console.log(user);
  }, [user])

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
  const backgroundSource: string = colorScheme === 'dark' ? require('../assets/images/background2.jpeg') :  require('../assets/images/background3.jpeg'); 
  // if(colorScheme === 'dark'){
  //   backgroundSource = 星空の画像
  // }else{
  //   backgroundSource = 空の画像
  // }
  
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={init} />
      }
    >
      <ImageBackground source={backgroundSource} resizeMode="cover" style={gstyle.bgimage}>
      {/* HTMLで言うと、Sectionや/DIVタグに近い */}
        {/* <Banner/> */}
        <View style={styles.welcome}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            marginBottom: 10
          }}>
            <Image source={require('../assets/images/welcome.png')} />
          </View>
          <Text style={styles.welcomeText}>{ dayjs().format('YYYY-MM-DD')}</Text>
          <Text style={[styles.welcomeText, gstyle.heading]}>{welcomeMessage}</Text>
          <Button icon="note" mode="contained" buttonColor={Colors[colorScheme].mainColor} onPress={() => navigation.navigate('Create')}>Check In</Button>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={gstyle.heading}>Past Diaries</Text>
        <Diaries items={diaries} />
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={gstyle.heading}>Diary Tips</Text>
        <View style={styles.tips}>
          <View style={styles.tipsCard} onTouchEnd={ () => navigation.navigate('Webview', {url: 'https://tapdiary.net/we-philosophy/'})}>
            <Image style={styles.tipsImage} source={require('../assets/images/tips1.png')} />
            <Text style={styles.tipsText}>App Philosophy</Text>
          </View>
          <View style={styles.tipsCard} onTouchEnd={ () => navigation.navigate('Webview', {url: 'https://tapdiary.net/about-2/'})}>
            <Image style={styles.tipsImage} source={require('../assets/images/tips2.png')} />
            <Text style={styles.tipsText}>Diary Benefits</Text>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}


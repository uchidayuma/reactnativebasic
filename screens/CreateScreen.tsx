import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';

import { Text, View } from '../components/Themed';
import { gstyle } from '../constants/Styles';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';

import { query, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../helpers/firebase';
import { db, insertDiary, updateDiary } from '../helpers/sqlite';

import { RootTabScreenProps } from '../types';

export default function CreateScreen({ navigation, route }: RootTabScreenProps<'Create'>) {
  const colorScheme = useColorScheme();
  const [isEditMode, setIsEditMode] = useState(false);
  const styles = StyleSheet.create({
    flatlist:{
      maxHeight: '40%',
      width: '100%'
    },
    emoji: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',
      marginHorizontal: 25,
      fontSize: 30,
      color: Colors[colorScheme].text
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    templateList: {
      // minHeight: '35%',
      maxHeight: '40%',
      width: '100%'
    },
    template: {
      fontSize: 14,
      lineHeight: 40,
      color: Colors[colorScheme].text
    },
    input: {
      fontSize: 14,
      width: '90%',
      marginHorizontal: '5%',
      lineHeight: 30,
      marginBottom: 30,
      color: Colors[colorScheme].text
    },
    button: {
      width: '50%',
      marginHorizontal: '25%',
      marginBottom: 40,
      borderColor: Colors[colorScheme].text,
      borderWidth: 1
    }
  });
  const [feels, setFeels] = useState([]);
  const [body, setBody] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [templates, setTemplates] = useState([]);
  // 日記作成スクリーンが起動した時、1度だけ絵文字を取得する
  useEffect( () =>{
    // firestoreから取ってくる処理
    getEmojies();
  }, [])
  // 第2引数にから配列を入れると1度だけ実行

  // propsとして受け取った日記データで状態を初期化
  useEffect(() => {
    console.log(route.params);
    
    if(route.params && route.params.diary) {
      const { body, emoji, feel_id, templates } = route.params.diary;
      setBody(body);
      setSelectedTemplate({ emoji, id: feel_id, templates });  // 仮定: diaryデータがこの形式で来る
      setIsEditMode(true);
    }
  }, [route.params]);

  const getEmojies = async() => {
    const q = query(collection(firestore, "feels"));
    let tmpFeels: string[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let array: string[] = doc.data();
      array['id'] = doc.id;
      tmpFeels.push(array);
    });
    setFeels(tmpFeels);
  }

  const emojiPress = (name: string) => {
    const selectedEmoji: string[] = feels.find(v => v.name === name);
    // console.log(selectedEmoji);
    setSelectedTemplate(selectedEmoji);
    setTemplates(selectedEmoji.templates);
  }
  const templatePress = (template: string) => {
    setBody(template);
  }
  const onSubmit = () => {
    insertDiary(db, body, selectedTemplate);
    Alert.alert(
      "Tap Diary",
      "Diary wrote",
      [
        { text: "OK", onPress: () => navigation.navigate('Home') }
      ]
    );
    setBody('');
  }
  const onUpdate = async() => {
    const result = await updateDiary(db, route.params.diary.id, body, selectedTemplate);
    console.log(result);
    
    if(result){
      Alert.alert(
        "Tap Diary",
        "Diary updated",
        [
          { text: "OK", onPress: () => navigation.navigate('Home') }
        ]
      );
      setBody('');
    }else{
      Alert.alert(
        "Tap Diary",
        "Diary update failed",
        [
          { text: "OK", onPress: () => navigation.navigate('Home') }
        ]
      );
    }
  }

  return (
    <View style={gstyle.bgimage}>
      <Text style={gstyle.heading}>Dairy Create</Text>
      <FlatList
        style={styles.flatlist}
        data={feels}
        horizontal={true}
        renderItem={({item}) => 
          <Text style={styles.emoji} onPress={() => emojiPress(item.name)}>{item.emoji + "\n" + item.name}</Text>
        }
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        style={styles.templateList}
        data={templates}
        renderItem={({item}) => 
          <Text style={styles.template} onPress={() => templatePress(item)}>{item}</Text>
        }
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        style={styles.input}
        onChangeText={setBody}
        value={body}
        multiline={true}
        numberOfLines={3}
        placeholder='diary content'
      />
      { isEditMode ?  
        <Button style={styles.button} icon="pen" mode="contained"
          buttonColor={Colors[colorScheme].accentColor}
          labelStyle={ {fontSize: 20} }
          disabled={body.length < 10}
          onPress={() => onUpdate()}>
            Update Diary
        </Button>
        :
        <Button style={styles.button} icon="pen" mode="contained"
          buttonColor={Colors[colorScheme].accentColor}
          labelStyle={ {fontSize: 20} }
          disabled={body.length < 10}
          onPress={() => onSubmit()}>
            Write Diary
        </Button>
      }
    </View>
  );
}

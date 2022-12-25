import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Button, Alert } from 'react-native';

import { Text, View } from '../components/Themed';
import { gstyle } from '../constants/Styles';

import { query, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../helpers/firebase';
import { db, insertDiary } from '../helpers/sqlite';

import { RootTabScreenProps } from '../types';

export default function CreateScreen({ navigation }: RootTabScreenProps<'Create'>) {
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
      fontSize: 30
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
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
        data={templates}
        renderItem={({item}) => 
          <Text onPress={() => templatePress(item)}>{item}</Text>
        }
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        // style={styles.input}
        onChangeText={setBody}
        value={body}
        placeholder='diary content'
      />
      <Button
        title="Write Diary"
        onPress={() => onSubmit()}
      />
    </View>
  );
}

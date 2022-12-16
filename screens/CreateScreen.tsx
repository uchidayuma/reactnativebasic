import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Button, Alert } from 'react-native';

import { Text, View } from '../components/Themed';

import { query, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../helpers/firebase';
import { db, insertDiary } from '../helpers/sqlite';

export default function CreateScreen() {
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
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <FlatList
        data={feels}
        horizontal={true}
        renderItem={({item}) => 
          <Text onPress={() => emojiPress(item.name)}>{item.emoji + "\n" + item.name}</Text>
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

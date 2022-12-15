import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, TextInput, Button, Alert } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { query, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../helpers/firebase';

export default function TabTwoScreen() {
  const [feels, setFeels] = useState([]);
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
      console.log(doc.data())
      // doc.data() is never undefined for query doc snapshots
      let array: string[] = doc.data();
      array['id'] = doc.id;
      tmpFeels.push(array);
    });
    setFeels(tmpFeels);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <FlatList
        data={feels}
        horizontal={true}
        renderItem={({item}) => 
          <Text>{item.emoji + "\n" + item.name}</Text>
        }
        // keyExtractor={item => item.id}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        // style={styles.input}
        // onChangeText={onChangeText}
        value='diary body'
      />
      <Button
        title="Write Diary"
        onPress={() => Alert.alert('Simple Button pressed')}
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

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from '../constants/Colors';

export const Diaries = (props: any) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    time: {
      fontSize: 14,
      color: Colors[colorScheme].text
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20
    },
    emoji: {
      fontSize: 42,
      marginRight: 10
    },
    body: {
      fontSize: 18,
      color: Colors[colorScheme].text
    }
  });
  const items: string[] = props.items.map((item: {})=> {
    const navigateToEditScreen = (item:any) => {
      navigation.navigate('Create', {diary: item});
    }
    return(
      <TouchableOpacity key={item.id} onPress={()=> navigateToEditScreen(item)}>
        <View>
          <Text style={styles.time}>{item.created_at}</Text>
            <Text style={styles.container}>
              {/* <Text style={styles.body}>{item.created_at}</Text> */}
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </Text>
        </View>
      </TouchableOpacity>
    )
  })

  return items;
}
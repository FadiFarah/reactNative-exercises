import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList, Pressable } from 'react-native';
import { useState } from "react";
import axios from "axios";

export default function MainScreen({navigation}) {
  const [searchText, setSearchText] = useState("");
  const [options, setOptions] = useState({
    method: 'GET',
    url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
    params: {q: '', pageNumber: '1', pageSize: '10', autoCorrect: 'true'},
    headers: {
      'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
      'X-RapidAPI-Key': 'daafd2adf0msh58b7f58ba9ebcc7p10bbd8jsn0e97df4fe0b8'
    }
  }); 
  const [arr, setArr] = useState([]);

  return (
    <View style={styles.container}>
      
      <StatusBar style='auto'/>
      
      <View style={styles.searchContainer}>
        <TextInput placeholder='Search...' value={searchText} onChangeText={(text) => {
            setSearchText(text);
            setOptions(prev => setOptions({...prev, params: {q: text, pageNumber: '1', pageSize: '10', autoCorrect: 'true'}}))
          }} 
        />
        <Button title="Search" onPress={() => {
          axios.request(options)
            .then((response) => {
              setArr(response.data.value)
            })
        }}></Button>
      </View>

      <FlatList keyExtractor={(item, index) => index} data={arr} renderItem={({ item }) => {
        return <View style={styles.cardContainer}>
            <Pressable onPress={() => {
                navigation.navigate("itemScreen", item);
            }}>
                <Text style={styles.cardTitle}>{item?.title}</Text>
                <Image style={styles.img} source={item?.url}></Image> 
            </Pressable>
      </View>
      }}
      
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchContainer: {
    borderWidth: 1,
    display: 'flex',
    flexDirection:'row',
  },
  cardContainer: {
    marginTop: 5,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10
  },
  cardTitle: {
    padding: 5,
    width: 300,
  },
  img: {
    width: 300,
    height: 300,
    borderRadius: 10
  }
});




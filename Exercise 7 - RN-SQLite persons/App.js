import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { Init, AddNewPerson, SelectPersonsByName } from './database';

export default function App() {
  const [listPersons, setListPersons] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [textInputs, setTextInputs] = useState({
    name: "",
    email: "",
    age: ""
  });
  useEffect(() => {
    Init().then(() => {
      console.log("created");
    })
    .catch(() => {

    })
  }, []);

  const handleAddPerson = () => {
    AddNewPerson(textInputs.name, textInputs.email, textInputs.age)
      .then(() => {
        alert(`${textInputs.name} has been added`);
      })
      .catch(() => {
        alert(`failed to add ${textInputs.name}`);
      })
      .finally(() => {
        setTextInputs({
          name: "",
          email: "",
          age: ""
        });
      })
  }

  const handleSearchByName = () => {
    SelectPersonsByName(searchText)
      .then((result) => {
        setListPersons(result);
      })
      .catch((error) => {
        console.log("Failed to get persons by name");
        console.error(error);
      })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputsContainer}>
        <TextInput value={textInputs.name} placeholder='Enter your name...' onChangeText={(txt) => setTextInputs({...textInputs, name: txt})} />
        <TextInput value={textInputs.email} placeholder='Enter your email...' onChangeText={(txt) => setTextInputs({...textInputs, email: txt})} />
        <TextInput value={textInputs.age} placeholder='Enter your age...' onChangeText={(txt) => setTextInputs({...textInputs, age: parseInt(txt)})} />
        <Button title='Add Person' onPress={handleAddPerson}></Button>
      </View>
      <View style={styles.searchContainer}>
        <TextInput value={searchText} placeholder='Search by name...' onChangeText={(txt) => {setSearchText(txt)}} />
        <Button title='Search by Person' onPress={handleSearchByName}></Button>
      </View>

      <FlatList keyExtractor={(item, index) => index} data={listPersons} renderItem={({item}) => {
        return  (<View >
                  <Text>{item?.Name}</Text>
                </View>)
      }}
      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
  inputsContainer: {
    borderWidth: 2,
    width: '70%',
    margin: 5
  },
  searchContainer: {
    margin: 5,
    borderWidth: 2,
    width: '70%'
  }
});




import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect, useRef } from "react";

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    setItems([{
      text: "Test1",
      isRemarked: false,
      isCritical: false
    },
    {
      text: "Test2",
      isRemarked: false,
      isCritical: false
    }])
  }, [null])
  
const onAddClick = () => {
  if(editingItem) {
    var tempItems = [...items];
    var index = tempItems.indexOf(editingItem);
    if(index !== -1)
    {
      tempItems[index] = {
        ...tempItems[index],
        text: ref.current.value,
      }
      ref.current.value = "";
      setEditingItem(null);
      setItems(tempItems);
    }
  }
  else {
    var newItem = {
      text: ref.current.value,
      isRemarked: false,
      isCritical: false
    }
    setItems([newItem, ...items]);
  }
}

const onDeleteClick = (item) => {
  const tempItems = [...items];
  var index = tempItems.indexOf(item);
  tempItems.splice(index, 1);
  setItems(tempItems);
}

const onEditClick = (item) => {
  ref.current.value = item.text;
  setEditingItem(item);
}

const onTopClick = (item) => {
  const tempItems = [...items];
  var index = tempItems.indexOf(item);
  tempItems.splice(index, 1);
  setItems([item, ...tempItems]);  
}

const onCriticalClick = (item) => {
  const tempItems = [...items];
  var index = tempItems.indexOf(item);
  if(index !== -1)
    {
      tempItems[index] = {
        ...tempItems[index],
        isCritical: !tempItems[index].isCritical,
      }
      setItems(tempItems);
    }
}

const onRemarkClick = (item) => {
  const tempItems = [...items];
  var index = tempItems.indexOf(item);
  if(index !== -1)
    {
      tempItems[index] = {
        ...tempItems[index],
        isRemarked: !tempItems[index].isRemarked,
      }
      setItems(tempItems);
    }
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display:'flex',
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: '10%',
      width: '100%'
    },
    textInput: {
      border: '1px solid'
    },
    inputContainer: {
      display:'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderWidth: 1,
      width: '90%'
    },
    itemsWrapper: {
      display: 'flex',
      width: '90%',
      flexDirection:'column',
    },
    item: {
      marginTop: 5,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: "rgba(0,0,0,0.1)",
    },
    remarkedItem: {
      borderWidth: 5
    },
    criticalItem: {
      backgroundColor: 'red'
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput ref={ref} placeholder="Write your text" keyboardType="phone-pad" />
        <Button onPress={() => onAddClick()} title="Add"></Button>
      </View>
      <View style={styles.itemsWrapper}>
        <ScrollView>
          {
            items.map((item, index) => {
              return (
                <TouchableOpacity key={index}>
                  <View  style={[styles.item, item.isRemarked && styles.remarkedItem, item.isCritical && styles.criticalItem]}>
                    <View>
                      <Text >
                        {item.text}
                      </Text>
                    </View>
                    <Button onPress={() => onDeleteClick(item)} title='Delete' color="#F7F708"></Button>
                    <Button onPress={() => onTopClick(item)} title='Top' color="#5EE72F"></Button>
                    <Button onPress={() => onEditClick(item)} title='Edit' color="#21857E"></Button>
                    <Button onPress={() => onRemarkClick(item)} title='Remark' color="#D32FE7"></Button>
                    <Button onPress={() => onCriticalClick(item)} title='Critical' color="#D34324"></Button>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </ScrollView>
      </View>
    </View>
  );
}




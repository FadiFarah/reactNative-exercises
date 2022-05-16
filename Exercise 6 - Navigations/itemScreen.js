import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TextInput, FlatList, Pressable } from 'react-native';
import { useState } from "react";
import { useRoute } from '@react-navigation/native';
import axios from "axios";

export default function ItemScreen() {
  const route = useRoute();

  const item = route.params;

  return (
    <View style={styles.container}>
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item?.title}</Text>
            <Image style={styles.img} source={item?.url}></Image> 
      </View>
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




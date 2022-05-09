import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from "react";

export default function App() {
  const [summary, setSummary] = useState(0);
  const [numberInputs, setNumberInputs] = useState({
    number1: 0,
    number2: 0,
    number3: 0
  });
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textInput: {
      border: '1px solid'
    },
    cont1: {
      borderWidth: 1,
      width: '70%'
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cont1}>
        <TextInput onChangeText={(e) => setNumberInputs({...numberInputs, number1: parseInt(e)})} placeholder="Write first number" keyboardType="number-pad" />
        <TextInput onChangeText={(e) => setNumberInputs({...numberInputs, number2: parseInt(e)})} placeholder="Write second number" keyboardType="number-pad" />
        <TextInput onChangeText={(e) => setNumberInputs({...numberInputs, number3: parseInt(e)})} placeholder="Write third number" keyboardType="number-pad" />

        <Button title="Click" onPress={() => setSummary(numberInputs.number1 + numberInputs.number2 + numberInputs.number3)}></Button>
        <Text>{summary}</Text>
      </View>
    </View>
  );
}




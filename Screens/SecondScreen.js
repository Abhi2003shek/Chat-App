import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';

function SecondScreen({ navigation }) {
  const [UserName, setUserName] = useState('');

  const handleNext = () => {
    if (!UserName.trim()) {
      alert('Please enter a valid name');
      return;
    }
    navigation.navigate('Chat', { UserName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder='Name'
        value={UserName}
        onChangeText={setUserName}
      />
      <Button
        color='#228B22'
        onPress={handleNext}
        title='Next'
      />
      <Image style={styles.Image} source={require('../assets/name.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6b5b95',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff',
    alignSelf: 'center',
    paddingBottom: 24,
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12
  },
  Image: {
    width: 300,
    height: 350,
    marginLeft: -10,
    marginTop: 100,
  }
});

export default SecondScreen;

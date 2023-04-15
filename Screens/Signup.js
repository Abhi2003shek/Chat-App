import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
  createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .then(()=> alert("Login Successful"))
        .catch(err =>{ console.log(`Login err: ${err}`);
        alert("Some error Caused in system \n CONTACT ABHISHEK");});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        textContentType='password'
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <Button onPress={onHandleSignup} color='#228B22' title='Signup'/> 
      <Button
        onPress={() => navigation.navigate('Login')}
        title='Go to Login'
      />
      <Image style={styles.Image} source={require('../assets/signup.png')} />
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
    paddingBottom: 24
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
  page: {
    width: 50,
    height: 50,
  },
  Image:{
    width: 300,
    height: 300,
    marginLeft: 90,
    marginTop: 50,
  }
});
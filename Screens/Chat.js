import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../config/firebase';

export default function Chat({ navigation, route }) {
  const [messages, setMessages] = useState([]);
  const { UserName } = route.params;

  const onSignOut = () => {
    signOut(auth)
      .catch(error => console.log('Error logging out: ', error))
      .then(() => {
        alert('Signed Out Successfully');
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: {
            _id: doc.data().user._id,
            name: doc.data().user.name
          },
          Name: doc.data().Name
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
      Name: UserName
    }).catch(error => {
      console.log('Error sending message: ', error);
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        avatar: 'https://i.pravatar.cc/300'
      }}
      renderMessage={props => (
        <View style={{marginLeft: 10,marginRight:10 ,padding:4,borderBottomWidth: 5, borderBottomColor: '#fff', backgroundColor:'#2d43'}}>
          <Text style={{fontWeight: 'bold',fontSize:10, fontStyle:'italic'}}>
            {props.currentMessage.Name}:
          </Text>
          <Text style={{fontSize:16}}>{props.currentMessage.text}</Text>
        </View>
      )}
    />
  );
}


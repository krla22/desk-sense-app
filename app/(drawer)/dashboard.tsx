import { View, Text, Button } from 'react-native'
import { router, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';

const auth = FIREBASE_AUTH;

const dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);
  return (
    <View>
      <Text>dashboard</Text>
      <Text>{user ? user.email : 'No user logged in'}</Text>
      <Button title='Simple View' onPress={() => router.push('/simpleview/simpleview')} />
    </View>
  )
}

export default dashboard
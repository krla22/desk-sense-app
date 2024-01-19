import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '@/stylesheets/loginstyle';

const auth = FIREBASE_AUTH;

const AuthenticatedScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const navigateToDashboard = () => {
    router.push('/(drawer)/dashboard');
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully!');
      router.push('/')
      // You may want to redirect the user to the login screen or perform other actions after logout.
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <SafeAreaView>
      <Text>Basic View</Text>
      <View>
        <Text style={{alignSelf: "center"}}>Posture Analysis</Text>
        <View style={{flexDirection: "row"}}>
          <Image style={{width: 180, height: 180}} source={{uri: 'https://cdn.discordapp.com/attachments/1194934283433943050/1197798223906082816/kisspng-poor-posture-human-back-low-back-pain-middle-back-old-how-it-works-study-in-australia-information-5b716872143556.7840094615341589620828.png?ex=65bc9386&is=65aa1e86&hm=745f6e11519e89b3f6339e97dce09f359114b0f15acab04ed550c1896c1a2dc9&'}}/>
          <Text>80.4%</Text>
        </View>
      </View>
      <Text>{user ? user.email : 'No user logged in'}</Text>
      <Button title="To Dashboard" onPress={navigateToDashboard} color="green" />
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </SafeAreaView>
  );
};

export default AuthenticatedScreen;

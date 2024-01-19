import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '@/stylesheets/loginstyle';
import { useWindowDimensions } from 'react-native';

const auth = FIREBASE_AUTH;

const AuthenticatedScreen = () => {
  const {height, width} = useWindowDimensions();
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
    <SafeAreaView style={{width: width, height: height, alignSelf: "center", justifyContent: 'center', borderWidth: 1, borderColor: "black"}}>
      <Text style={{alignSelf: "center", fontSize: 20, fontWeight: "bold", paddingBottom: 10}}>Basic View</Text>

      <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, alignSelf: "center", width: 310, padding: 10}}>
        <Text style={{alignSelf: "center", fontSize: 30, fontWeight: "bold"}}>Overall Rating:</Text>
        <View style={{flexDirection: "row", alignSelf: "center"}}>
          <Text style={{alignSelf: "center", fontSize: 20, fontStyle: "italic"}}>You are doing great!</Text>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 10, borderRadius: 20, padding: 1}}>
        
        <View style={{flexDirection:"row", marginTop: 10, gap: 10}}>
          
          <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 10, alignSelf: "center", width: 150}}>
            <View style={{alignSelf: "center"}}>
              <Image style={{width: 50, height: 50}} source={{uri: 'https://cdn.discordapp.com/attachments/1194934283433943050/1197838179726798878/Temperature.png?ex=65bcb8bc&is=65aa43bc&hm=df8c2c870700caee8f1e9335eb03a4e31b371c239b0fd309c3ed1306789fa6f5&' }} />
            </View>
            <View style={{alignSelf: "center"}}>
              <Text >Temperature</Text>
              <Text style={{alignSelf: "center"}}>30°C</Text>
            </View>
          </View>

          <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 10, alignSelf: "center", width: 150}}>
          <View style={{alignSelf: "center"}}>
              <Image style={{width: 50, height: 50}} source={{uri: 'https://media.discordapp.net/attachments/1194934283433943050/1197836883321962558/Humidity.png?ex=65bcb787&is=65aa4287&hm=c9897fa676ab889acf3e2b7276b60ed8765bfd55d1c5eb08a13b79bcf67350e4&=&format=webp&quality=lossless&width=640&height=640' }} />
            </View>
            <View style={{alignSelf: "center"}}>
              <Text>Humidity</Text>
              <Text style={{alignSelf: "center"}}>32%</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection:"row", marginTop: 10, marginBottom: 20, gap: 10}}>
          <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 10, alignSelf: "center", width: 150}}>
            <View style={{alignSelf: "center"}}>
              <Image style={{width: 50, height: 50}} source={{uri: 'https://media.discordapp.net/attachments/1194934283433943050/1197836883586195496/Loudness.png?ex=65bcb787&is=65aa4287&hm=f5fe1850d7851ef2987a823d1c991692a6a60f09d1948f7bb058efb5fb6218aa&=&format=webp&quality=lossless&width=640&height=640' }} />
            </View>
            <View style={{alignSelf: "center"}}>
              <Text>Loudness</Text>
              <Text style={{alignSelf: "center"}}>50db</Text>
            </View>
          </View>

          <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 10, alignSelf: "center", width: 150}}>
            <View style={{alignSelf: "center"}}>
              <Image style={{width: 50, height: 50, }} source={{uri: 'https://cdn.discordapp.com/attachments/1194934283433943050/1197798223906082816/kisspng-poor-posture-human-back-low-back-pain-middle-back-old-how-it-works-study-in-australia-information-5b716872143556.7840094615341589620828.png?ex=65bc9386&is=65aa1e86&hm=745f6e11519e89b3f6339e97dce09f359114b0f15acab04ed550c1896c1a2dc9&' }} />
            </View>
            <View style={{alignSelf: "center"}}>
              <Text style={{alignSelf: "center"}}>Posture</Text>
              <Text style={{alignSelf: "center"}}>Doing great!</Text>
            </View>
          </View>
        </View>
      </View>

      <Pressable onPress={navigateToDashboard} style={{alignSelf: "center", backgroundColor: "green", width: 130, height: 35, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
          <Text style={{textAlign: "center", paddingTop: 7, color: "white"}}>
            To Dashboard
          </Text>
        </Pressable>
        <Pressable onPress={handleLogout} style={{alignSelf: "center", backgroundColor: "red", width: 130, height: 35, borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>
          <Text style={{textAlign: "center", paddingTop: 7, color: "white"}}>
            Logout
          </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AuthenticatedScreen;

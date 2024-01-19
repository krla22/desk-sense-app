import 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { View, Text, SafeAreaView, Button, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { router } from 'expo-router';

const auth = FIREBASE_AUTH;

function CustomDrawerContent(props: any) {
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flexDirection: "row", alignSelf:"center", paddingLeft: 50, paddingRight: 50, paddingTop: 20, paddingBottom: 20, borderBottomWidth: 1, borderTopWidth: 1, borderColor: "black"}}>
          <View style={{marginRight: 10, marginLeft: -10}}>
            <Image 
              source={{uri:'https://upload.wikimedia.org/wikipedia/commons/6/63/Icon_Bird_512x512.png'}} 
              style={{width: 80, height: 80, borderWidth: 1, borderColor: 'black', borderRadius: 50}}
            />
          </View>
          <View style={{alignSelf: "center"}}>
            <Text style={{fontWeight: "bold", margin: 10}}>
              {user ? `${user.email}` : 'Not Logged In'}
            </Text>
            <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderColor: "black"}}>
        <Text>DeskSense</Text>
      </View>
    </SafeAreaView>
  )
}

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Drawer drawerContent = {CustomDrawerContent}>
        <Drawer.Screen name='dashboard' 
          options={{
            drawerLabel: 'Dashboard',
            headerTitle: 'Dashboard',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen name='settings' 
          options={{
            drawerLabel: 'Settings',
            headerTitle: 'Settings',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="settings" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen name='posture' 
          options={{
            drawerLabel: 'Posture',
            headerTitle: 'Posture',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="body" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen name='temperature' 
          options={{
            drawerLabel: 'Temperature',
            headerTitle: 'Temperature',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="thermometer" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen name='humidity' 
          options={{
            drawerLabel: 'Humidity',
            headerTitle: 'Humidity',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="cloudy" size={size} color={color} />
            )
          }}
        />
        <Drawer.Screen name='loudness' 
          options={{
            drawerLabel: 'Loudness',
            headerTitle: 'Loudness',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="megaphone" size={size} color={color} />
            )
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default DrawerLayout
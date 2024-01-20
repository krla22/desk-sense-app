import 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { View, Text, SafeAreaView, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { FIREBASE_AUTH, firebase } from '@/firebaseConfig';
import { router } from 'expo-router';
import images from '@/images/images';

const auth = FIREBASE_AUTH;

function CustomDrawerContent(props: any) {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(false);

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        const userEmail = user.email;
        const profileImageRef = firebase.storage().ref().child(`${userEmail}`);
        
        try {
          const downloadURL = await profileImageRef.getDownloadURL();
          setProfileImage(downloadURL);
        } catch (error) {
          console.error('Error fetching profile image:', error.message);
          const placeholderRef = firebase.storage().ref().child('placeholder.jpg');
          const placeholderURL = await placeholderRef.getDownloadURL().catch(() => '');
          setProfileImage(placeholderURL);
        }
      }
    });

    return () => unsubscribe();
  }, [updateTrigger]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={{flexDirection: "row", alignSelf:"center", marginTop: 20, paddingLeft: 50, paddingRight: 50, paddingTop: 20, paddingBottom: 20, borderBottomWidth: 1, borderTopWidth: 1, borderColor: "black"}}>
          <View style={{marginRight: 10, marginLeft: -10}}>
            <TouchableOpacity onPress={() => router.push('/profile/profiles')}>
              <Image 
                source={profileImage ? { uri: profileImage } : {uri: 'https://example.com/placeholder-image.jpg'}} 
                style={{width: 80, height: 80, borderWidth: 1, borderColor: 'black', borderRadius: 50}}
              />
            </TouchableOpacity>
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
            headerRight: () => <TouchableOpacity style={{marginRight: 15, padding: 5, borderWidth: 1, borderColor: "black", backgroundColor: "lightgreen"}} onPress={() => router.push('/simpleview/simpleview')}><Text>To Basic View</Text></TouchableOpacity>,
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
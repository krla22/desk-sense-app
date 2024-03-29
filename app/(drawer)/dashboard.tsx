import { View, Text, Button, Image, Alert, ScrollView } from 'react-native'
import { router, useRouter } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { FIREBASE_AUTH } from '@/firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe'

const auth = FIREBASE_AUTH;

const dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const videos = [
    { title: 'The dangers of prolonged sitting posture', videoId: 'k1iZYaUz8uY' },
    { title: 'Why proper room temperature is important', videoId: 'RWiOhlqEDz4' },
    { title: 'What is humidity?', videoId: 'ZQDcitKup_4' },
    { title: 'Taking care of your ears', videoId: 'fOMBzdzh6tQ' },
  ];

  const snapOffsets = videos.map((_, index) => index * 355);

  return (
    <ScrollView style={{flex: 1, borderWidth: 1, borderColor: 'black'}}>
      <View style={{marginTop: 10}}>
        <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, alignSelf: "center", width: 310, padding: 10, backgroundColor: "#91e8fa"}}>
          <Text style={{alignSelf: "center", fontSize: 30, fontWeight: "bold"}}>Welcome back!</Text>
        </View>

        <View style={{alignItems: 'center', borderRadius: 20, padding: 1}}>
          <View style={{flexDirection:"row", marginTop: 10, gap: 10}}>
            <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 10, alignSelf: "center", width: 150, backgroundColor: "#f7e4bd"}}>
              <View style={{alignSelf: "center"}}>
                <Image style={{width: 50, height: 50}} source={{uri: 'https://cdn.discordapp.com/attachments/1194934283433943050/1197838179726798878/Temperature.png?ex=65bcb8bc&is=65aa43bc&hm=df8c2c870700caee8f1e9335eb03a4e31b371c239b0fd309c3ed1306789fa6f5&' }} />
              </View>
              <View style={{alignSelf: "center", alignItems: "center"}}>
                <Text>Temperature</Text>
                <Text>30°C</Text>
                <Text 
                  style={{
                    alignSelf: "center", 
                    padding: 10, 
                    justifyContent: "center"
                  }}>
                  - Use a fan or cooler to lower the temperatures
                </Text>
              </View>
            </View>

            <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 10, alignSelf: "center", width: 150, backgroundColor: "#f7e4bd"}}>
            <View style={{alignSelf: "center"}}>
                <Image style={{width: 50, height: 50}} source={{uri: 'https://media.discordapp.net/attachments/1194934283433943050/1197836883321962558/Humidity.png?ex=65bcb787&is=65aa4287&hm=c9897fa676ab889acf3e2b7276b60ed8765bfd55d1c5eb08a13b79bcf67350e4&=&format=webp&quality=lossless&width=640&height=640' }} />
              </View>
              <View style={{alignSelf: "center", alignItems: "center"}}>
                <Text>Humidity</Text>
                <Text>32%</Text>
                <Text 
                  style={{
                    alignSelf: "center", 
                    padding: 10, 
                    justifyContent: "center"
                  }}>
                  - This is a comfortable humidity! 
                </Text>
              </View>
            </View>
          </View>

          <View style={{flexDirection:"row", marginTop: 10, marginBottom: 20, gap: 10}}>
            <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 10, alignSelf: "center", width: 150, backgroundColor: "#f7e4bd"}}>
              <View style={{alignSelf: "center"}}>
                <Image style={{width: 50, height: 50}} source={{uri: 'https://media.discordapp.net/attachments/1194934283433943050/1197836883586195496/Loudness.png?ex=65bcb787&is=65aa4287&hm=f5fe1850d7851ef2987a823d1c991692a6a60f09d1948f7bb058efb5fb6218aa&=&format=webp&quality=lossless&width=640&height=640' }} />
              </View>
              <View style={{alignSelf: "center", alignItems: "center"}}>
                <Text>Loudness</Text>
                <Text>50db</Text>
                <Text 
                  style={{
                    alignSelf: "center", 
                    padding: 10, 
                    justifyContent: "center"
                  }}>
                  - This is healthy room loudness levels 
                </Text>
              </View>
            </View>

            <View style={{borderWidth: 1, borderColor: "black", borderRadius: 20, padding: 10, alignSelf: "center", width: 150, backgroundColor: "#f7e4bd"}}>
              <View style={{alignSelf: "center"}}>
                <Image style={{width: 50, height: 50, }} source={{uri: 'https://cdn.discordapp.com/attachments/1194934283433943050/1197798223906082816/kisspng-poor-posture-human-back-low-back-pain-middle-back-old-how-it-works-study-in-australia-information-5b716872143556.7840094615341589620828.png?ex=65bc9386&is=65aa1e86&hm=745f6e11519e89b3f6339e97dce09f359114b0f15acab04ed550c1896c1a2dc9&' }} />
              </View>
              <View style={{alignSelf: "center"}}>
                <Text style={{alignSelf: "center"}}>Posture</Text>
                <Text style={{alignSelf: "center"}}>Doing great!</Text>
                <Text 
                  style={{
                    alignSelf: "center", 
                    padding: 10, 
                    justifyContent: "center"
                  }}>
                  - Your sitting posture is correct!
                </Text>
              </View>
            </View>
          </View>

          <View style={{alignItems: "center", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "black", marginBottom: 20}}>
            <Text style={{fontWeight: "bold"}}>Want to learn more for your health?</Text>
          </View>

          <ScrollView
            horizontal
            style={{marginRight: 10, marginLeft: 10}}
            snapToOffsets={snapOffsets}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / 320);
              console.log('Snapped to video index:', index);
            }}>
            {videos.map((video, index) => (
              <View key={index} style={{alignItems: 'center', borderRadius: 20}}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{video.title}</Text>
                  <YoutubePlayer
                    height={225}
                    width={355}
                    play={playing}
                    videoId={video.videoId}
                  />
                </View>
              </View>
            ))}
          </ScrollView>
          </View>
        </View>
      </ScrollView>
  )
}

export default dashboard
import { View, Text, Button } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack, router } from 'expo-router'

export default function _layout() {
  return (
    <Stack 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name='index' />
    </Stack>
  )
}
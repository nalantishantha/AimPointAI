import React from 'react';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';
import { Activity, Trophy } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Platform.OS === 'ios' ? 'transparent' : '#090A0F',
          borderTopWidth: 1,
          borderTopColor: '#1E2330',
          height: 85,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        },
        tabBarBackground: () => 
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} tint="dark" style={{ flex: 1 }} />
          ) : null,
        tabBarActiveTintColor: '#00F0FF',
        tabBarInactiveTintColor: '#A1A1AA',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'TELEMETRY',
          tabBarIcon: ({ color, size }) => (
            <Activity size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'RANKINGS',
          tabBarIcon: ({ color, size }) => (
            <Trophy size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

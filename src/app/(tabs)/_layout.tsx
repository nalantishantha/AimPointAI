import React from 'react';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { Platform } from 'react-native';
import { LayoutDashboard, ScanLine, ClipboardList, PlaySquare, User } from 'lucide-react-native';

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
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
          fontWeight: '600',
          marginTop: -5,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'DASHBOARD',
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analyze"
        options={{
          title: 'ANALYZE',
          tabBarIcon: ({ color, size }) => (
            <ScanLine size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plan"
        options={{
          title: 'PLAN',
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tutorials"
        options={{
          title: 'TUTORIALS',
          tabBarIcon: ({ color, size }) => (
            <PlaySquare size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, size }) => (
            <User size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import React from 'react';
import { View, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Title, Body, Label, MonoText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AIContainer } from '@/components/ui/AIContainer';
import { Settings, LogOut, Award, Activity } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  return (
    <AIContainer safeArea={true}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1 px-6 pt-6">
        
        {/* Profile Header */}
        <MotiView 
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          className="items-center mb-10 mt-4"
        >
          <View className="w-24 h-24 rounded-full bg-secondary-bg border-2 border-accent items-center justify-center mb-4">
            <MonoText className="text-white text-2xl">
              {user ? `${user.firstName[0]}${user.lastName[0]}` : 'OP'}
            </MonoText>
          </View>
          <Title className="text-2xl mb-1">
            {user ? `${user.firstName} ${user.lastName}` : 'Operator 01'}
          </Title>
          <Label className="text-secondary-text tracking-widest text-xs">MEMBER SINCE 2026</Label>
        </MotiView>

        {/* Stats Grid */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          className="flex-row justify-between mb-8"
        >
          <View className="flex-1 bg-secondary-bg/50 border border-border rounded-xl p-4 mr-2 items-center">
            <Activity color="#00F0FF" size={24} className="mb-2" />
            <Title className="text-xl">142</Title>
            <Label className="text-[10px] text-secondary-text tracking-widest">SCANS</Label>
          </View>
          
          <View className="flex-1 bg-secondary-bg/50 border border-border rounded-xl p-4 ml-2 items-center">
            <Award color="#F47A20" size={24} className="mb-2" />
            <Title className="text-xl">Top 12%</Title>
            <Label className="text-[10px] text-secondary-text tracking-widest">RANKING</Label>
          </View>
        </MotiView>

        {/* Settings List */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 400 }}
          className="space-y-2 mb-8"
        >
          <Label className="text-secondary-text tracking-widest text-xs mb-2">SYSTEM PREFERENCES</Label>
          
          <View className="flex-row items-center justify-between bg-card border border-border rounded-xl p-4">
            <Title className="text-base">Account Details</Title>
            <Settings color="#A1A1AA" size={20} />
          </View>
          
          <View className="flex-row items-center justify-between bg-card border border-border rounded-xl p-4">
            <Title className="text-base">Subscription (Pro)</Title>
            <Settings color="#A1A1AA" size={20} />
          </View>

          <View className="flex-row items-center justify-between bg-card border border-border rounded-xl p-4">
            <Title className="text-base">Data & Privacy</Title>
            <Settings color="#A1A1AA" size={20} />
          </View>
        </MotiView>

        {/* Logout */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 600 }}
        >
          <Button 
            label="DISCONNECT" 
            variant="secondary"
            icon={<LogOut color="#A1A1AA" size={18} />}
            onPress={async () => {
              await signOut();
              // Router effect in AuthContext will handle kick to (auth)
            }}
          />
        </MotiView>

      </ScrollView>
    </AIContainer>
  );
}

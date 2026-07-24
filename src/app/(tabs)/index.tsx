import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Title, Body, Label, MonoText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AIContainer } from '@/components/ui/AIContainer';
import { CalendarDays, ScanLine, Activity, Target } from 'lucide-react-native';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <AIContainer safeArea={true}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1 px-6 pt-6">
        
        {/* Header Block */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <MonoText className="text-neural/70 mb-1">// STATUS: ACTIVE</MonoText>
            <Title className="text-2xl">Operator 01</Title>
          </View>
          <View className="w-12 h-12 rounded-full bg-secondary-bg border border-border items-center justify-center">
            <MonoText className="text-white">OP</MonoText>
          </View>
        </View>

        {/* Today's Protocol Card */}
        <MotiView 
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800 }}
          className="bg-card border border-border rounded-2xl p-6 mb-8 relative overflow-hidden"
        >
          <View className="absolute top-0 right-0 p-4 opacity-10">
            <CalendarDays color="#00F0FF" size={80} />
          </View>
          
          <Label className="text-neural tracking-widest text-xs mb-2">TODAY's PROTOCOL</Label>
          <Title className="text-xl mb-1">Catch & Shoot Phase II</Title>
          <Body className="text-sm mb-6 text-secondary-text">Focus on immediate alignment and fast release tempo.</Body>
          
          <Button 
            label="Initialize Protocol" 
            icon={<Target color="#FFFFFF" size={18} />}
            onPress={() => router.push('/(tabs)/plan')}
            className="w-full"
          />
        </MotiView>

        {/* Quick Launch Actions */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          className="mb-8"
        >
          <Label className="text-secondary-text mb-4 tracking-widest text-xs">ACQUISITION</Label>
          <Button 
            label="NEW VIDEO SCAN" 
            variant="secondary"
            icon={<ScanLine color="#F47A20" size={20} />}
            onPress={() => router.push('/capture')}
          />
        </MotiView>

        {/* Recent Telemetry List */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 300 }}
        >
          <View className="flex-row justify-between items-end mb-4">
            <Label className="text-secondary-text tracking-widest text-xs">RECENT TELEMETRY</Label>
            <Label className="text-accent text-xs">VIEW ALL</Label>
          </View>

          {/* Dummy Session Data */}
          {[1, 2, 3].map((item, index) => (
            <View 
              key={index}
              className="flex-row items-center justify-between bg-secondary-bg/50 border border-border/50 rounded-xl p-4 mb-3"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-primary-bg items-center justify-center mr-4">
                  <Activity color="#A1A1AA" size={18} />
                </View>
                <View>
                  <Label className="text-white mb-1">Session {89 - index}</Label>
                  <Body className="text-xs text-secondary-text">Yesterday, 4:30 PM</Body>
                </View>
              </View>
              <View className="items-end">
                <Label className="text-neural font-bold">{88 - (index * 4)}%</Label>
                <MonoText className="text-[10px] text-secondary-text">SCORE</MonoText>
              </View>
            </View>
          ))}
        </MotiView>
        
      </ScrollView>
    </AIContainer>
  );
}

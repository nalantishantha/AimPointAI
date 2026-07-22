import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Title, Body, Label, MonoText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AIContainer } from '@/components/ui/AIContainer';
import { Video, Activity } from 'lucide-react-native';

export default function DashboardEmptyScreen() {
  const router = useRouter();

  return (
    <AIContainer safeArea={true}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1 px-6 pt-6">
        
        {/* Header */}
        <View className="flex-row justify-between items-center mb-10">
          <View>
            <MonoText className="text-neural/70 mb-1">// STATUS: AWAITING_DATA</MonoText>
            <Title>Operator 01</Title>
          </View>
          <View className="w-12 h-12 rounded-full bg-secondary-bg border border-border items-center justify-center">
            <MonoText className="text-white">OP</MonoText>
          </View>
        </View>

        {/* Empty State Banner */}
        <MotiView 
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8 relative overflow-hidden items-center justify-center min-h-[220px]"
        >
          {/* Subtle neural background glow */}
          <View className="absolute top-1/2 left-1/2 -ml-16 -mt-16 w-32 h-32 bg-neural opacity-10 blur-3xl rounded-full" />
          
          <Activity color="#A1A1AA" size={32} className="mb-4" />
          <Title className="text-xl text-center mb-2">No Telemetry Found</Title>
          <Body className="text-center text-sm">
            Your neural network is empty. Initialize your first video scan to establish a baseline proficiency score.
          </Body>
        </MotiView>

        {/* Primary Action */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
        >
          <Label className="text-secondary-text mb-4 tracking-widest text-xs">AQUISITION</Label>
          <Button 
            label="INITIALIZE NEW VIDEO SCAN" 
            icon={<Video color="#FFFFFF" size={20} />}
            onPress={() => router.push('/capture')}
            className="mb-8"
          />
        </MotiView>

        {/* Empty Sessions Placeholder */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 300 }}
        >
          <View className="flex-row justify-between items-end mb-4">
            <Label className="text-secondary-text tracking-widest text-xs">RECENT TELEMETRY</Label>
          </View>

          {[1, 2].map((item, index) => (
            <View 
              key={index}
              className="flex-row items-center justify-between bg-card/50 border border-border/50 rounded-xl p-4 mb-3 opacity-50"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-primary-bg items-center justify-center mr-4">
                  <View className="w-4 h-4 rounded-full bg-border" />
                </View>
                <View>
                  <View className="w-24 h-4 bg-border rounded mb-2" />
                  <View className="w-16 h-3 bg-border rounded" />
                </View>
              </View>
              <View className="w-8 h-6 bg-border rounded" />
            </View>
          ))}
        </MotiView>
        
      </ScrollView>
    </AIContainer>
  );
}

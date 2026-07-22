import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Title, Body, Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Users, Share, Copy } from 'lucide-react-native';

export default function Step5Screen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary-bg">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 pt-8 pb-10 justify-between">
          
          <View>
            <MotiView 
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800 }}
              className="mb-8"
            >
              <Title className="mb-2 text-3xl">Build your squad</Title>
              <Body>Invite teammates to compare telemetry and climb the global leaderboards together.</Body>
            </MotiView>

            <MotiView 
              from={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'timing', duration: 800, delay: 200 }}
              className="w-full bg-card border border-border rounded-2xl p-6 items-center"
            >
              <View className="w-16 h-16 rounded-full bg-secondary-bg items-center justify-center mb-4">
                <Users color="#FFFFFF" size={28} />
              </View>
              <Title className="text-xl mb-1">Squad Link</Title>
              <Body className="text-center text-sm mb-6">Send this link to your teammates to automatically group your stats.</Body>
              
              <Pressable className="w-full flex-row items-center bg-secondary-bg border border-border rounded-xl px-4 py-3 mb-4">
                <Label className="flex-1 text-secondary-text truncate text-xs font-mono" numberOfLines={1}>
                  aimpoint.ai/sq/49x82z
                </Label>
                <Copy color="#A1A1AA" size={16} />
              </Pressable>

              <Button 
                label="Share Invite Link" 
                variant="neural"
                icon={<Share color="#00F0FF" size={18} />}
                onPress={() => {}}
                className="w-full"
              />
            </MotiView>
          </View>

          <MotiView 
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 800, delay: 400 }}
            className="mt-auto pt-8"
          >
            <Pressable 
              onPress={() => router.push('/(onboarding)/step-6')}
              className="mb-4 items-center py-4"
            >
              <Label className="text-secondary-text font-medium">Skip for now</Label>
            </Pressable>
            
            <Button 
              label="Continue" 
              onPress={() => router.push('/(onboarding)/step-6')}
            />
          </MotiView>

        </View>
      </ScrollView>
    </View>
  );
}

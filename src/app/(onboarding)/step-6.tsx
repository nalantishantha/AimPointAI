import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Title, Body, Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Globe, Lock, EyeOff, CheckCircle2 } from 'lucide-react-native';

const PRIVACY_OPTIONS = [
  {
    id: 'public',
    title: 'Public',
    description: 'Telemetry and scores appear on global leaderboards and squad rankings.',
    icon: Globe,
  },
  {
    id: 'private',
    title: 'Private',
    description: 'Data is only visible to you and your approved squad members.',
    icon: Lock,
  },
  {
    id: 'hidden',
    title: 'Hidden',
    description: 'Ghost protocol. You do not appear in any rankings.',
    icon: EyeOff,
  }
];

export default function Step6Screen() {
  const router = useRouter();
  const [selectedPrivacy, setSelectedPrivacy] = useState('public');

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
              <Title className="mb-2 text-3xl">Privacy Directives</Title>
              <Body>Who can access your performance telemetry?</Body>
            </MotiView>

            <MotiView 
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 200 }}
              className="w-full space-y-4"
            >
              {PRIVACY_OPTIONS.map((option) => {
                const isSelected = selectedPrivacy === option.id;
                const Icon = option.icon;
                
                return (
                  <Pressable
                    key={option.id}
                    onPress={() => setSelectedPrivacy(option.id)}
                    className={`p-5 rounded-2xl border transition-colors flex-row items-center mb-3 ${
                      isSelected ? 'bg-accent/10 border-accent' : 'bg-card border-border'
                    }`}
                  >
                    <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${
                      isSelected ? 'bg-accent/20' : 'bg-secondary-bg'
                    }`}>
                      <Icon color={isSelected ? '#F47A20' : '#A1A1AA'} size={20} />
                    </View>
                    
                    <View className="flex-1">
                      <Label className={`text-base mb-1 ${isSelected ? 'text-white' : 'text-primary-text'}`}>
                        {option.title}
                      </Label>
                      <Body className="text-xs leading-5">
                        {option.description}
                      </Body>
                    </View>

                    {isSelected && (
                      <View className="ml-2">
                        <CheckCircle2 color="#F47A20" size={20} />
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </MotiView>
          </View>

          <MotiView 
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 800, delay: 400 }}
            className="mt-auto pt-8"
          >
            <Button 
              label="Complete Initialization" 
              onPress={() => router.replace('/(tabs)')}
            />
          </MotiView>

        </View>
      </ScrollView>
    </View>
  );
}

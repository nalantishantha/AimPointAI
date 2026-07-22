import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Title, Body, Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

const ACQUISITION_SOURCES = [
  'Instagram',
  'TikTok',
  'App Store',
  'Friends & Family',
  'YouTube',
  'Google',
  'Coach / Trainer',
  'Other'
];

export default function Step4Screen() {
  const router = useRouter();
  const [selectedSource, setSelectedSource] = useState('');

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
              <Title className="mb-2 text-3xl">Where did you hear about us?</Title>
              <Body>Help us understand our community growth.</Body>
            </MotiView>

            <MotiView 
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 200 }}
              className="w-full flex-row flex-wrap gap-3"
            >
              {ACQUISITION_SOURCES.map((source) => {
                const isSelected = selectedSource === source;
                return (
                  <Pressable
                    key={source}
                    onPress={() => setSelectedSource(source)}
                    className={`px-5 py-4 rounded-xl border transition-colors ${
                      isSelected ? 'bg-white border-white' : 'bg-card border-border'
                    }`}
                  >
                    <Label className={isSelected ? 'text-primary-bg font-semibold' : 'text-secondary-text'}>
                      {source}
                    </Label>
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
              label="Continue" 
              onPress={() => router.push('/(onboarding)/step-5')}
              disabled={!selectedSource}
              className={!selectedSource ? 'opacity-50' : ''}
            />
          </MotiView>

        </View>
      </ScrollView>
    </View>
  );
}

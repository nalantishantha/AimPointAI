import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Title, Body } from '@/components/ui/Typography';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Step1Screen() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-primary-bg"
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 pt-8 pb-10 justify-between">
          
          <View>
            <MotiView 
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800 }}
              className="mb-8"
            >
              <Title className="mb-2 text-3xl">Tell us about yourself</Title>
              <Body>What should we call you on the court?</Body>
            </MotiView>

            <MotiView 
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 200 }}
              className="w-full"
            >
              <Input 
                placeholder="First Name"
                value={name}
                onChangeText={setName}
                autoFocus
                className="text-lg"
              />
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
              onPress={() => router.push('/(onboarding)/step-2')}
              disabled={name.length < 2}
              className={name.length < 2 ? 'opacity-50' : ''}
            />
          </MotiView>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

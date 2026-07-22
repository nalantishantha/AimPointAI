import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Image } from 'expo-image';
import { Title, Body, Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AIContainer } from '@/components/ui/AIContainer';

export default function AuthWelcomeScreen() {
  const router = useRouter();

  return (
    <AIContainer safeArea={true}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1 px-6 pt-16 pb-12">
        <View className="flex-1 justify-center items-center">
          <MotiView
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'timing', duration: 800 }}
            className="items-center w-full"
          >
            <Image 
              source={require('@/../assets/images/logo.png')} 
              style={{ width: 80, height: 80, marginBottom: 24 }}
              contentFit="contain"
            />
            <Title className="text-3xl text-center mb-3">Join AimPoint AI</Title>
            <Body className="text-center px-4">
              Unlock precision analysis and elite training protocols to transform your game.
            </Body>
          </MotiView>
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          className="w-full space-y-4"
        >
          <Button 
            label="Sign Up" 
            variant="primary" 
            onPress={() => router.push('/(auth)/signup')}
            className="mb-4"
          />
          <Button 
            label="Log In" 
            variant="secondary" 
            onPress={() => router.push('/(auth)/login')}
            className="mb-4"
          />
        </MotiView>
      </ScrollView>
    </AIContainer>
  );
}

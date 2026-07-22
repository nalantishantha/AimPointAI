import React, { useState } from 'react';
import { View, ScrollView, Pressable, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import LottieView from 'lottie-react-native';
import { Title, Body, Label } from '@/components/ui/Typography';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AIContainer } from '@/components/ui/AIContainer';
import { ChevronLeft } from 'lucide-react-native';

export default function EmailSignupScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/(onboarding)');
    }, 2500); // Simulate network request
  };

  return (
    <AIContainer safeArea={true}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 relative"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          
          <View className="absolute top-4 left-6 z-10">
            <Pressable 
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-secondary-bg border border-border items-center justify-center"
            >
              <ChevronLeft color="#FFF" size={24} />
            </Pressable>
          </View>

          <View className="flex-1 px-6 justify-center pb-10 pt-12">
            
            <MotiView 
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800 }}
              className="mb-8"
            >
              <Title className="mb-2">Create Account</Title>
              <Body>Use your email to access AimPoint AI.</Body>
            </MotiView>

            <MotiView 
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 200 }}
              className="w-full mb-8"
            >
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Input 
                    label="FIRST NAME" 
                    placeholder="Michael"
                    value={firstName}
                    onChangeText={setFirstName}
                  />
                </View>
                <View className="flex-1 ml-4">
                  <Input 
                    label="LAST NAME" 
                    placeholder="Jordan"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

              <Input 
                label="EMAIL ADDRESS" 
                placeholder="operator@aimpoint.ai"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              
              <Input 
                label="PASSWORD" 
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Input 
                label="CONFIRM PASSWORD" 
                placeholder="••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </MotiView>

            <MotiView 
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 800, delay: 400 }}
              className="mt-4"
            >
              <Button 
                label="Continue" 
                onPress={handleSignup}
                className="mb-4"
              />
              
              <View className="flex-row justify-center items-center mb-6">
                <Label className="text-secondary-text font-normal mr-2">Already have an account?</Label>
                <Pressable onPress={() => router.push('/(auth)/login')} hitSlop={10}>
                  <Label className="text-accent font-semibold tracking-wide text-[15px]">Log In</Label>
                </Pressable>
              </View>

              <Label className="text-secondary-text font-normal text-xs text-center leading-5 px-4">
                By continuing, you agree to the <Label className="text-white text-xs">Terms of Service</Label> and <Label className="text-white text-xs">Privacy Policy</Label>.
              </Label>
            </MotiView>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Loading Overlay */}
      {isLoading && (
        <MotiView 
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-primary-bg/80 items-center justify-center z-50"
          style={StyleSheet.absoluteFill}
        >
          <View className="w-32 h-32 items-center justify-center">
            <LottieView 
              source={require('@/../assets/animation/Baseketball.json')} 
              autoPlay 
              loop 
              style={{ width: '100%', height: '100%' }} 
            />
          </View>
          <Label className="text-neural mt-4 tracking-widest text-xs">INITIALIZING NETWORK...</Label>
        </MotiView>
      )}
    </AIContainer>
  );
}

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
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/api/client';
import axios from 'axios';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async () => {
    setErrorMsg('');
    setIsLoading(true);
    
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      });
      
      await signIn(response.data.token, response.data.user);
      // The Layout routing effect will automatically kick us to (tabs)
    } catch (error: any) {
      console.log('Login failed:', error.message);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMsg(error.response.data.error || 'Invalid credentials');
      } else {
        setErrorMsg('Network error. Is the server running?');
      }
      setIsLoading(false);
    }
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

          <View className="flex-1 px-6 justify-center pb-10">
            
            <MotiView 
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800 }}
              className="mb-8 mt-12"
            >
              <Title className="mb-2">Log In</Title>
              <Body>Welcome back to AimPoint AI.</Body>
            </MotiView>

            <MotiView 
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 200 }}
              className="w-full mb-8"
            >
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

              <Pressable onPress={() => {}} className="self-end mt-2">
                <Label className="text-accent font-medium text-sm">Forgot Password?</Label>
              </Pressable>
            </MotiView>

            <MotiView 
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 800, delay: 400 }}
            >
              {errorMsg ? (
                <Label className="text-red-500 text-center mb-4 text-sm font-semibold">{errorMsg}</Label>
              ) : null}

              <Button 
                label="Log In" 
                onPress={handleLogin}
                className="mb-4"
              />

              <View className="flex-row justify-center items-center mb-6">
                <Label className="text-secondary-text font-normal mr-2">Don't have an account?</Label>
                <Pressable onPress={() => router.push('/(auth)/signup')} hitSlop={10}>
                  <Label className="text-accent font-semibold tracking-wide text-[15px]">Sign Up</Label>
                </Pressable>
              </View>
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
          <Label className="text-neural mt-4 tracking-widest text-xs">AUTHENTICATING...</Label>
        </MotiView>
      )}
    </AIContainer>
  );
}

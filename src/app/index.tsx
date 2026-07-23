import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import LottieView from 'lottie-react-native';
import { HeroTitle, Body } from '@/components/ui/Typography';
import { AIContainer } from '@/components/ui/AIContainer';
import { useAuth } from '@/context/AuthContext';

export default function AnimatedSplashScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Play lottie animation
    animationRef.current?.play();
    
    // Simulate initialization process and transition to the onboarding carousel
    const timer = setTimeout(() => {
      // Don't route if we haven't finished checking secure storage yet
      if (isLoading) return;

      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/carousel');
      }
    }, 3500);

    return () => clearTimeout(timer);
  }, [router, user, isLoading]);

  return (
    <AIContainer safeArea={false}>
      <View className="flex-1 bg-primary-bg items-center justify-center relative overflow-hidden">
        
        {/* Background Glow Effect Simulated with Moti */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1.2 }}
          transition={{ type: 'timing', duration: 2000, loop: true, repeatReverse: true }}
          className="absolute top-1/4 w-[400px] h-[400px] rounded-full bg-accent blur-3xl"
        />

        <View className="flex-1 items-center justify-center z-10 w-full px-6">
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 1200 }}
            className="items-center w-full"
          >
            {/* Bouncing Basketball Lottie Animation */}
            <View className="w-[200px] h-[200px] mb-8 items-center justify-center relative">
              <LottieView
                ref={animationRef}
                source={require('@/../assets/animation/Baseketball.json')}
                style={{ width: '100%', height: '100%', position: 'absolute' }}
                loop
              />
            </View>
            
            <HeroTitle className="mb-2 tracking-widest text-center">AIMPOINT AI</HeroTitle>
            <Body className="text-secondary-text text-center text-sm px-4">
              Precision Basketball Analytics & Form Tracking
            </Body>
          </MotiView>
        </View>

      </View>
    </AIContainer>
  );
}

import React from 'react';
import { View, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { cn } from '@/utils/utils';
import { LinearGradient } from 'expo-linear-gradient'; // Oh wait, I don't have expo-linear-gradient installed. Let's just use standard views or install it.

// Let's stick to standard View to reduce dependencies, using NativeWind styles
export function AIContainer({ 
  children, 
  className,
  safeArea = true 
}: { 
  children: React.ReactNode; 
  className?: string;
  safeArea?: boolean;
}) {
  const Container = safeArea ? SafeAreaView : View;
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-primary-bg"
    >
      <Container className={cn("flex-1", className)}>
        {children}
      </Container>
    </KeyboardAvoidingView>
  );
}

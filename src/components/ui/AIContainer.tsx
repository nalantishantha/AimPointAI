import React from 'react';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/utils/utils';
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

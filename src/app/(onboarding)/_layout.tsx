import React from 'react';
import { View, Pressable } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OnboardingLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const getStepProgress = () => {
    if (pathname.includes('step-1')) return 1;
    if (pathname.includes('step-2')) return 2;
    if (pathname.includes('step-3')) return 3;
    if (pathname.includes('step-4')) return 4;
    if (pathname.includes('step-5')) return 5;
    if (pathname.includes('step-6')) return 6;
    return 1;
  };

  const currentStep = getStepProgress();
  const totalSteps = 6;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View className="flex-1 bg-primary-bg">
      <View style={{ paddingTop: insets.top }} className="bg-primary-bg pb-4 border-b border-border z-10">
        <View className="flex-row items-center justify-between px-6 h-12">
          <Pressable 
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center -ml-2"
          >
            <ChevronLeft color="#FFF" size={24} />
          </Pressable>

          <View className="flex-1 px-4">
            <View className="w-full h-1.5 bg-secondary-bg rounded-full overflow-hidden">
              <MotiView 
                animate={{ width: `${progressPercentage}%` }}
                transition={{ type: 'timing', duration: 400 }}
                className="h-full bg-accent rounded-full"
              />
            </View>
          </View>
          
          <View className="w-10" />
        </View>
      </View>

      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="step-1" />
        <Stack.Screen name="step-2" />
        <Stack.Screen name="step-3" />
        <Stack.Screen name="step-4" />
        <Stack.Screen name="step-5" />
        <Stack.Screen name="step-6" />
      </Stack>
    </View>
  );
}

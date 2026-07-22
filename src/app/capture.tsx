import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { BlurView } from 'expo-blur';
import { Title, MonoText, Label } from '@/components/ui/Typography';
import { X, Camera, RefreshCw } from 'lucide-react-native';

export default function CaptureScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-primary-bg relative">
      {/* Simulated Camera Feed Background */}
      <View className="absolute inset-0 bg-[#0F111A] items-center justify-center">
        {/* Placeholder for actual camera view */}
        <MotiView 
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 1500, loop: true, repeatReverse: true }}
        >
          <MonoText className="text-secondary-text/30 text-2xl text-center">
            [ CAMERA FEED ]{'\n'}INITIALIZING...
          </MonoText>
        </MotiView>
      </View>

      {/* AR Overlays */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none" className="justify-center items-center">
        {/* Grid Overlay */}
        <View className="absolute inset-0 border-[0.5px] border-neural/10" style={{ margin: '10%' }} />
        
        {/* Target Bounding Box */}
        <MotiView
          from={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 500 }}
          className="w-64 h-96 border border-neural/50 items-center justify-between py-10"
        >
          <View className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neural" />
          <View className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neural" />
          <View className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neural" />
          <View className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neural" />
          
          <MonoText className="text-neural/80 text-xs text-center w-full mt-4">
            ALIGN SUBJECT{'\n'}WITHIN BOUNDS
          </MonoText>
          
          <View className="w-full flex-row justify-between px-8">
            <View className="w-1.5 h-1.5 bg-accent rounded-full" />
            <View className="w-1.5 h-1.5 bg-accent rounded-full" />
          </View>
        </MotiView>
      </View>

      {/* Header UI */}
      <View className="pt-14 px-6 flex-row justify-between items-center z-10">
        <Pressable 
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-black/50 items-center justify-center border border-white/10"
        >
          <X color="#FFF" size={20} />
        </Pressable>
        <BlurView intensity={20} tint="dark" className="px-4 py-1.5 rounded-full overflow-hidden border border-white/10">
          <MonoText className="text-neural text-[10px]">LENS_CALIBRATED</MonoText>
        </BlurView>
        <Pressable className="w-10 h-10 rounded-full bg-black/50 items-center justify-center border border-white/10">
          <RefreshCw color="#FFF" size={18} />
        </Pressable>
      </View>

      {/* Footer UI */}
      <View className="absolute bottom-0 left-0 right-0 pb-12 pt-8 px-8 items-center justify-center z-10 bg-gradient-to-t from-primary-bg to-transparent">
        <Pressable 
          onPress={() => {
            // Simulate capture and analysis
            router.replace('/analysis/sim-01');
          }}
          className="items-center"
        >
          <MotiView
            from={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: 'timing', duration: 1000, loop: true, repeatReverse: true }}
            className="w-20 h-20 rounded-full border-2 border-accent items-center justify-center p-1"
          >
            <View className="w-full h-full rounded-full bg-accent items-center justify-center">
              <Camera color="#FFF" size={28} />
            </View>
          </MotiView>
          <MonoText className="mt-4 text-white text-xs tracking-widest">INITIATE SCAN</MonoText>
        </Pressable>
      </View>
    </View>
  );
}

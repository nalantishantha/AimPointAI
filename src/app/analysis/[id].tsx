import React from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { BlurView } from 'expo-blur';
import { Title, Body, Label, MonoText } from '@/components/ui/Typography';
import { AIContainer } from '@/components/ui/AIContainer';
import { ChevronLeft, Play, AlertCircle, CheckCircle2 } from 'lucide-react-native';

const METRICS = [
  { id: 1, label: 'RELEASE ANGLE', value: '45°', score: 9.2, optimal: '45-48°', time: '00:12.4' },
  { id: 2, label: 'ELBOW ALIGNMENT', value: '88°', score: 7.5, optimal: '90°', time: '00:11.8', warning: true },
  { id: 3, label: 'KNEE FLEXION', value: '112°', score: 9.8, optimal: '110-115°', time: '00:10.2' },
];

export default function AnalysisScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <AIContainer safeArea={false}>
      {/* Top Video Player Simulation */}
      <View className="w-full h-80 bg-black relative justify-end pb-4">
        <MotiView 
          from={{ opacity: 0.2 }}
          animate={{ opacity: 0.8 }}
          transition={{ type: 'timing', duration: 1500, loop: true, repeatReverse: true }}
          className="absolute inset-0 items-center justify-center"
        >
          {/* Skeleton representation */}
          <View className="w-1 h-32 bg-neural/30 rounded-full rotate-12" />
          <View className="w-1 h-20 bg-accent/50 rounded-full -rotate-45 absolute ml-20" />
        </MotiView>

        <BlurView intensity={30} tint="dark" className="mx-4 p-4 rounded-xl flex-row items-center justify-between border border-white/10">
          <Pressable className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
            <Play color="#FFF" size={20} fill="#FFF" className="ml-1" />
          </Pressable>
          <View className="flex-1 px-4">
            <View className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <View className="w-[60%] h-full bg-accent rounded-full" />
            </View>
          </View>
          <MonoText className="text-white text-xs">00:12.4</MonoText>
        </BlurView>

        {/* Back Button */}
        <Pressable 
          onPress={() => router.back()}
          className="absolute top-14 left-4 w-10 h-10 rounded-full bg-black/50 items-center justify-center border border-white/10 z-10"
        >
          <ChevronLeft color="#FFF" size={24} />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        <View className="flex-row justify-between items-end mb-6">
          <View>
            <MonoText className="text-neural/70 mb-1">// SCAN_ID: {id}</MonoText>
            <Title>Telemetry Breakdown</Title>
          </View>
          <View className="items-end">
            <MonoText className="text-3xl font-bold text-white">88</MonoText>
            <MonoText className="text-[10px] text-neural tracking-widest">SYS_SCORE</MonoText>
          </View>
        </View>

        {/* Metrics List */}
        <View className="mb-8">
          {METRICS.map((metric, i) => (
            <MotiView
              key={metric.id}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ type: 'timing', duration: 500, delay: 200 + (i * 150) }}
              className="bg-card border border-border rounded-xl p-4 mb-3"
            >
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  {metric.warning ? (
                    <AlertCircle color="#F47A20" size={16} className="mr-2" />
                  ) : (
                    <CheckCircle2 color="#00F0FF" size={16} className="mr-2" />
                  )}
                  <Label className="text-white text-sm tracking-widest">{metric.label}</Label>
                </View>
                <MonoText className="text-neural text-xs">{metric.score}/10</MonoText>
              </View>
              
              <View className="flex-row justify-between items-center bg-secondary-bg p-3 rounded-lg border border-border/50">
                <View>
                  <MonoText className="text-secondary-text text-[10px] mb-1">RECORDED</MonoText>
                  <MonoText className="text-white text-lg">{metric.value}</MonoText>
                </View>
                <View className="w-[1px] h-full bg-border" />
                <View>
                  <MonoText className="text-secondary-text text-[10px] mb-1">OPTIMAL</MonoText>
                  <MonoText className="text-white text-lg">{metric.optimal}</MonoText>
                </View>
                <View className="w-[1px] h-full bg-border" />
                <Pressable className="items-center px-2">
                  <MonoText className="text-secondary-text text-[10px] mb-1">JUMP TO</MonoText>
                  <MonoText className="text-accent underline">{metric.time}</MonoText>
                </Pressable>
              </View>
            </MotiView>
          ))}
        </View>

        {/* AI Recommendations */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 600 }}
          className="mb-8"
        >
          <Label className="text-secondary-text tracking-widest text-xs mb-4">SYSTEM DIRECTIVES</Label>
          <View className="bg-neural/10 border border-neural/30 rounded-2xl p-5 relative overflow-hidden">
            <View className="absolute top-0 right-0 w-2 h-full bg-neural" />
            <Title className="text-lg text-white mb-2">Adjust Elbow Flare</Title>
            <Body className="text-sm">
              Your elbow alignment is deviating by 2 degrees from optimal trajectory. Tuck the elbow in closer to your core during the upward motion to stabilize release.
            </Body>
            <Pressable className="mt-4 flex-row items-center">
              <Play color="#00F0FF" size={16} className="mr-2" />
              <MonoText className="text-neural">LOAD TRAINING MODULE</MonoText>
            </Pressable>
          </View>
        </MotiView>
        
        {/* Proceed to Personal Plan */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 800 }}
          className="mb-12"
        >
          <Pressable 
            onPress={() => router.push('/(tabs)/plan')}
            className="w-full bg-accent rounded-full h-14 flex-row items-center justify-center border-2 border-accent"
          >
            <MonoText className="text-primary-bg font-bold tracking-widest">GENERATE PERSONAL PLAN</MonoText>
          </Pressable>
        </MotiView>

      </ScrollView>
    </AIContainer>
  );
}

import React from 'react';
import { View, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Title, Body, Label, MonoText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AIContainer } from '@/components/ui/AIContainer';
import { ClipboardList, BrainCircuit, Lock, Activity, Target } from 'lucide-react-native';

export default function PlanScreen() {
  return (
    <AIContainer safeArea={true}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1 px-6 pt-6">
        
        {/* Header */}
        <MotiView 
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800 }}
          className="mb-8"
        >
          <MonoText className="text-neural/70 mb-1">// MODULE: AI COACH</MonoText>
          <Title className="text-3xl mb-2">Protocol Plan</Title>
          <Body>Your adaptive training regimen, algorithmically generated based on your telemetric weaknesses from SCAN_ID: sim-01.</Body>
        </MotiView>

        {/* Current Protocol Focus */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          className="bg-card border border-border rounded-2xl p-6 mb-8 relative overflow-hidden"
        >
          <View className="absolute -top-4 -right-4 p-4 opacity-10">
            <BrainCircuit color="#F47A20" size={120} />
          </View>
          
          <Label className="text-accent tracking-widest text-xs mb-2">PRIORITY TARGET</Label>
          <Title className="text-xl mb-4">Elbow Alignment Correction</Title>
          
          <View className="space-y-4 mb-6 mt-2">
            <View className="flex-row items-start">
              <View className="w-8 h-8 rounded-full bg-accent/20 items-center justify-center mr-3">
                <Target color="#F47A20" size={14} />
              </View>
              <View className="flex-1">
                <MonoText className="text-white mb-1">Form Shooting (Close Range)</MonoText>
                <Body className="text-sm text-secondary-text">Perform 50 reps using only one hand. Tuck the elbow tight to the core. Ensure 90° angle.</Body>
              </View>
            </View>
            <View className="flex-row items-start">
              <View className="w-8 h-8 rounded-full bg-accent/20 items-center justify-center mr-3">
                <Activity color="#F47A20" size={14} />
              </View>
              <View className="flex-1">
                <MonoText className="text-white mb-1">Guide Hand Resistance</MonoText>
                <Body className="text-sm text-secondary-text">30 reps. Use a resistance band on the shooting arm to prevent elbow flare during upward motion.</Body>
              </View>
            </View>
          </View>
          
          <Button 
            label="START DRILL" 
            icon={<ClipboardList color="#FFFFFF" size={18} />}
            onPress={() => {}}
            className="w-full"
          />
        </MotiView>

        {/* Locked Future Phases */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 400 }}
        >
          <Label className="text-secondary-text tracking-widest text-xs mb-4">UPCOMING PHASES</Label>
          
          <View className="border border-border/50 bg-secondary-bg/20 rounded-xl p-5 mb-3 flex-row items-center justify-between opacity-50">
            <View className="flex-1 mr-4">
              <Title className="text-base text-white">Phase III: Range Extension</Title>
              <Body className="text-xs text-secondary-text mt-1">Requires 85% efficiency in Elbow Alignment</Body>
            </View>
            <Lock color="#A1A1AA" size={20} />
          </View>

          <View className="border border-border/50 bg-secondary-bg/20 rounded-xl p-5 flex-row items-center justify-between opacity-50">
            <View className="flex-1 mr-4">
              <Title className="text-base text-white">Phase IV: Elite Arc Control</Title>
              <Body className="text-xs text-secondary-text mt-1">Requires 45+ degree consistent release</Body>
            </View>
            <Lock color="#A1A1AA" size={20} />
          </View>
        </MotiView>

      </ScrollView>
    </AIContainer>
  );
}

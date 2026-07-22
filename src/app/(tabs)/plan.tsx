import React from 'react';
import { View, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Title, Body, Label, MonoText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AIContainer } from '@/components/ui/AIContainer';
import { ClipboardList, BrainCircuit, Lock } from 'lucide-react-native';

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
          <Body>Your adaptive training regimen, algorithmically generated based on your telemetric weaknesses.</Body>
        </MotiView>

        {/* Current Protocol Focus */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          className="bg-card border border-border rounded-2xl p-6 mb-8 relative overflow-hidden"
        >
          <View className="absolute -top-4 -right-4 p-4 opacity-10">
            <BrainCircuit color="#00F0FF" size={120} />
          </View>
          
          <Label className="text-neural tracking-widest text-xs mb-2">PHASE II: TEMPO</Label>
          <Title className="text-xl mb-4">Catch & Shoot Mechanics</Title>
          
          <View className="space-y-3 mb-6">
            <View className="flex-row items-start">
              <View className="w-6 h-6 rounded-full bg-accent/20 items-center justify-center mr-3">
                <Label className="text-accent text-xs">1</Label>
              </View>
              <Body className="flex-1 text-sm text-secondary-text">Perform 50 reps with immediate hip drop on catch.</Body>
            </View>
            <View className="flex-row items-start">
              <View className="w-6 h-6 rounded-full bg-accent/20 items-center justify-center mr-3">
                <Label className="text-accent text-xs">2</Label>
              </View>
              <Body className="flex-1 text-sm text-secondary-text">Maintain 0.6s release speed threshold.</Body>
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
            <View>
              <Title className="text-base text-white">Phase III: Range Extension</Title>
              <Body className="text-xs text-secondary-text mt-1">Requires 85% efficiency in Phase II</Body>
            </View>
            <Lock color="#A1A1AA" size={20} />
          </View>

          <View className="border border-border/50 bg-secondary-bg/20 rounded-xl p-5 flex-row items-center justify-between opacity-50">
            <View>
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

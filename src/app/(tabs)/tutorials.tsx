import React from 'react';
import { View, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Title, Body, Label, MonoText } from '@/components/ui/Typography';
import { AIContainer } from '@/components/ui/AIContainer';
import { PlaySquare, Video } from 'lucide-react-native';

export default function TutorialsScreen() {
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
          <MonoText className="text-neural/70 mb-1">// MODULE: DATABASE</MonoText>
          <Title className="text-3xl mb-2">Pro Library</Title>
          <Body>Study the foundational mechanics of elite shooters. Universal access library.</Body>
        </MotiView>

        {/* Video List */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          className="space-y-6"
        >
          {/* Tutorial Item 1 */}
          <View className="mb-6">
            <View className="w-full h-48 bg-secondary-bg/50 border border-border rounded-2xl items-center justify-center mb-3 relative overflow-hidden">
              <PlaySquare color="#F47A20" size={32} />
              <View className="absolute bottom-2 right-2 bg-primary-bg/80 px-2 py-1 rounded">
                <MonoText className="text-xs">12:45</MonoText>
              </View>
            </View>
            <Label className="text-accent tracking-widest text-[10px] mb-1">BIOMECHANICS</Label>
            <Title className="text-lg mb-1">The Kinetic Chain</Title>
            <Body className="text-sm text-secondary-text">How energy transfers from the floor through your release point.</Body>
          </View>

          {/* Tutorial Item 2 */}
          <View className="mb-6">
            <View className="w-full h-48 bg-secondary-bg/50 border border-border rounded-2xl items-center justify-center mb-3 relative overflow-hidden">
              <Video color="#A1A1AA" size={32} className="opacity-50" />
              <View className="absolute bottom-2 right-2 bg-primary-bg/80 px-2 py-1 rounded">
                <MonoText className="text-xs">08:20</MonoText>
              </View>
            </View>
            <Label className="text-neural tracking-widest text-[10px] mb-1">ALIGNMENT</Label>
            <Title className="text-lg mb-1">Perfecting the Guide Hand</Title>
            <Body className="text-sm text-secondary-text">Eliminate thumb flicks and off-hand interference.</Body>
          </View>

          {/* Tutorial Item 3 */}
          <View className="mb-6">
            <View className="w-full h-48 bg-secondary-bg/50 border border-border rounded-2xl items-center justify-center mb-3 relative overflow-hidden">
              <Video color="#A1A1AA" size={32} className="opacity-50" />
              <View className="absolute bottom-2 right-2 bg-primary-bg/80 px-2 py-1 rounded">
                <MonoText className="text-xs">15:10</MonoText>
              </View>
            </View>
            <Label className="text-neural tracking-widest text-[10px] mb-1">TEMPO</Label>
            <Title className="text-lg mb-1">One-Motion vs Two-Motion</Title>
            <Body className="text-sm text-secondary-text">Breaking down the speed advantages of modern shooting forms.</Body>
          </View>

        </MotiView>
      </ScrollView>
    </AIContainer>
  );
}

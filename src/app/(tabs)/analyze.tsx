import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Title, Body, Label, MonoText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AIContainer } from '@/components/ui/AIContainer';
import { ScanLine, History } from 'lucide-react-native';

export default function AnalyzeScreen() {
  const router = useRouter();

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
          <MonoText className="text-neural/70 mb-1">// MODULE: COMPUTER VISION</MonoText>
          <Title className="text-3xl mb-2">Analyze</Title>
          <Body>Capture or upload a video to receive frame-by-frame biomechanical feedback.</Body>
        </MotiView>

        {/* Primary Action */}
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800, delay: 200 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8 items-center justify-center relative overflow-hidden"
        >
          <View className="absolute top-1/2 left-1/2 -ml-16 -mt-16 w-32 h-32 bg-accent opacity-10 blur-3xl rounded-full" />
          
          <ScanLine color="#F47A20" size={48} className="mb-4" />
          <Title className="text-xl mb-2">Acquire New Data</Title>
          <Body className="text-center text-sm mb-6 text-secondary-text">
            For best results, record at 60fps from a side or front angle.
          </Body>
          
          <Button 
            label="LAUNCH SCANNER" 
            icon={<ScanLine color="#FFFFFF" size={20} />}
            onPress={() => router.push('/capture')}
            className="w-full"
          />
        </MotiView>

        {/* Analysis History Placeholder */}
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 800, delay: 400 }}
        >
          <View className="flex-row items-center mb-6">
            <History color="#A1A1AA" size={16} className="mr-2" />
            <Label className="text-secondary-text tracking-widest text-xs">AWAITING PROCESSING...</Label>
          </View>
          
          <View className="border border-border/50 border-dashed rounded-xl p-8 items-center justify-center opacity-50">
            <Body className="text-center text-secondary-text text-sm">
              Your historical scan data and AI overlays will appear here after your first analysis.
            </Body>
          </View>
        </MotiView>

      </ScrollView>
    </AIContainer>
  );
}

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { Title, Body, Label, MonoText } from '@/components/ui/Typography';
import { AIContainer } from '@/components/ui/AIContainer';
import { PlaySquare } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { TUTORIALS } from '@/data/tutorials';
import { useVideoPlayer, VideoView } from 'expo-video';

// We extract this into a separate component so each video player has its own hook state
function TutorialItem({ item }: { item: typeof TUTORIALS[0] }) {
  const router = useRouter();
  
  // Create an inline player for the preview
  const player = useVideoPlayer(item.source, player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => router.push(`/tutorial/${item.id}`)}
      className="mb-6"
    >
      <View className="w-full h-48 bg-secondary-bg/50 border border-border rounded-2xl items-center justify-center mb-3 relative overflow-hidden">
        
        {/* Inline Video Preview */}
        <VideoView
          style={{ width: '100%', height: '100%', position: 'absolute' }}
          player={player}
          contentFit="cover"
          fullscreenOptions={{ enable: false }}
          nativeControls={false}
        />

        {/* Overlay to darken video slightly and show play icon */}
        <View className="absolute inset-0 bg-primary-bg/20 items-center justify-center">
          <PlaySquare color="#F47A20" size={40} opacity={0.9} />
        </View>

        <View className="absolute bottom-2 right-2 bg-primary-bg/80 px-2 py-1 rounded">
          <MonoText className="text-xs">{item.duration}</MonoText>
        </View>
      </View>
      
      <Label className="text-accent tracking-widest text-[10px] mb-1">{item.category}</Label>
      <Title className="text-lg mb-1">{item.title}</Title>
      <Body className="text-sm text-secondary-text">{item.description}</Body>
    </TouchableOpacity>
  );
}

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
          {TUTORIALS.map((item) => (
            <TutorialItem key={item.id} item={item} />
          ))}
        </MotiView>

      </ScrollView>
    </AIContainer>
  );
}

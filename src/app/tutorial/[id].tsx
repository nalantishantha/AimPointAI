import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { TUTORIALS } from '@/data/tutorials';
import { ChevronLeft } from 'lucide-react-native';
import { Title, Body, Label } from '@/components/ui/Typography';
import { MotiView } from 'moti';

export default function TutorialPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const tutorial = TUTORIALS.find((t) => t.id === id);

  if (!tutorial) {
    // If not found, just go back
    useEffect(() => {
      router.back();
    }, []);
    return null;
  }

  // Initialize the player
  const player = useVideoPlayer(tutorial.source, player => {
    player.loop = false;
    player.play();
  });

  return (
    <View style={styles.container}>
      {/* The actual video player taking up the top section */}
      <View style={styles.videoContainer}>
        <VideoView
          style={styles.video}
          player={player}
          allowsFullscreen
          allowsPictureInPicture
          contentFit="contain"
        />

        {/* Back Button Overlay */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <View className="w-10 h-10 rounded-full bg-primary-bg/80 items-center justify-center border border-border">
            <ChevronLeft color="#FFFFFF" size={24} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Tutorial Details */}
      <MotiView 
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800 }}
        style={styles.detailsContainer}
      >
        <Label className="text-accent tracking-widest text-xs mb-2">{tutorial.category}</Label>
        <Title className="text-2xl mb-2">{tutorial.title}</Title>
        <Body className="text-secondary-text">{tutorial.description}</Body>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09090B', // primary-bg
  },
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000000',
    position: 'relative',
    marginTop: 50, // Safe area padding roughly
  },
  video: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
  },
  detailsContainer: {
    padding: 24,
  }
});

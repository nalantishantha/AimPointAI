import React, { useRef, useState } from 'react';
import { View, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { HeroTitle, Body, MonoText } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { AIContainer } from '@/components/ui/AIContainer';
import { Video } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: 1,
    title: 'Precision AI\nAnalysis',
    description: 'Track your release, tempo, and arc in real-time with frame-by-frame machine learning breakdowns.',
  },
  {
    id: 2,
    title: 'Pro-Level\nInsights',
    description: 'Get tailored coaching feedback and compare your form against the mechanics of elite shooters.',
  },
  {
    id: 3,
    title: 'Transform\nYour Game',
    description: 'See the visual proof of your progress. The data-driven path to a perfect shot starts right here.',
  }
];

export default function CarouselScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const nextSlide = () => {
    if (activeIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({ x: (activeIndex + 1) * width, animated: true });
    } else {
      router.replace('/(auth)');
    }
  };

  return (
    <AIContainer safeArea={true} className="bg-primary-bg">
      <View className="flex-1">
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {SLIDES.map((slide) => (
            <View key={slide.id} style={{ width }} className="flex-1 pt-4 px-6 pb-[160px]">
              
              {/* Top Video Placeholder */}
              <View className="flex-1 w-full bg-secondary-bg/30 rounded-3xl mb-8 items-center justify-center border border-border/50">
                <Video color="#A1A1AA" size={32} className="mb-2 opacity-50" />
                <MonoText className="text-secondary-text/50 text-xs tracking-widest">
                  [ VIDEO ASSET PENDING ]
                </MonoText>
              </View>
              
              {/* Text Content Area */}
              <View className="w-full">
                <MotiView
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'timing', duration: 800 }}
                >
                  <HeroTitle className="mb-3 leading-[42px]">{slide.title}</HeroTitle>
                  <Body className="text-[15px] leading-6 text-secondary-text">{slide.description}</Body>
                </MotiView>
              </View>

            </View>
          ))}
        </ScrollView>

        {/* Bottom Controls */}
        <View className="absolute bottom-6 left-0 right-0 px-6 bg-primary-bg">
          
          {/* Pagination Dots */}
          <View className="flex-row items-center justify-center space-x-4 mb-8">
            {SLIDES.map((_, index) => (
              <MotiView
                key={index}
                animate={{
                  width: activeIndex === index ? 24 : 8,
                  backgroundColor: activeIndex === index ? '#F47A20' : '#1E2330'
                }}
                transition={{ type: 'timing', duration: 300 }}
                className="h-2 rounded-full"
              />
            ))}
          </View>

          {/* Next Button */}
          <Button 
            label={activeIndex === SLIDES.length - 1 ? "Let's Go" : "Next"} 
            fullWidth={true}
            className="rounded-full h-14 w-full"
            onPress={nextSlide}
          />
          
        </View>
      </View>
    </AIContainer>
  );
}

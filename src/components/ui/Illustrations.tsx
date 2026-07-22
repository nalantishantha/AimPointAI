import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Path, Rect, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { MotiView } from 'moti';

interface IllustrationProps {
  width?: number;
  height?: number;
  className?: string;
}

export function SplashLogo({ width = 120, height = 120, className }: IllustrationProps) {
  return (
    <View className={className}>
      <Svg width={width} height={height} viewBox="0 0 120 120" fill="none">
        <Defs>
          <LinearGradient id="orangeGrad" x1="0" y1="0" x2="120" y2="120">
            <Stop offset="0%" stopColor="#F47A20" />
            <Stop offset="100%" stopColor="#D85C00" />
          </LinearGradient>
        </Defs>
        <Circle cx="60" cy="60" r="50" fill="url(#orangeGrad)" />
        {/* Basketball Lines */}
        <Path d="M60 10 V110 M10 60 H110" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <Path d="M30 15 A 40 40 0 0 0 30 105" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
        <Path d="M90 15 A 40 40 0 0 1 90 105" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
        {/* AI Dots/Nodes */}
        <Circle cx="60" cy="60" r="6" fill="#FFFFFF" />
        <Circle cx="30" cy="60" r="4" fill="#FFFFFF" />
        <Circle cx="90" cy="60" r="4" fill="#FFFFFF" />
        <Circle cx="60" cy="20" r="4" fill="#FFFFFF" />
        <Circle cx="60" cy="100" r="4" fill="#FFFFFF" />
      </Svg>
    </View>
  );
}

export function WelcomeIllustration({ width = 280, height = 280, className }: IllustrationProps) {
  return (
    <MotiView 
      className={className}
      from={{ translateY: 10, opacity: 0 }}
      animate={{ translateY: 0, opacity: 1 }}
      transition={{ type: 'timing', duration: 1000, loop: true, repeatReverse: true }}
    >
      <Svg width={width} height={height} viewBox="0 0 280 280" fill="none">
        <Circle cx="140" cy="140" r="120" fill="#F2F0EB" />
        <Circle cx="140" cy="140" r="90" fill="#FFFFFF" />
        <Rect x="80" y="80" width="120" height="120" rx="20" fill="#F8F7F4" stroke="#E8E8E8" strokeWidth="2" />
        
        {/* Abstract player skeleton */}
        <Path d="M140 100 V150 M140 120 L110 140 M140 120 L170 100 M140 150 L120 190 M140 150 L160 190" stroke="#F47A20" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx="140" cy="90" r="10" fill="#F47A20" />
        
        {/* UI overlay elements */}
        <Rect x="160" y="90" width="40" height="16" rx="8" fill="#22C55E" />
        <Rect x="175" y="115" width="30" height="12" rx="6" fill="#FFFFFF" stroke="#E8E8E8" />
      </Svg>
    </MotiView>
  );
}

export function AuthIllustration({ width = 160, height = 120, className }: IllustrationProps) {
  return (
    <View className={className}>
      <Svg width={width} height={height} viewBox="0 0 160 120" fill="none">
        <Circle cx="80" cy="60" r="50" fill="#F2F0EB" />
        <Circle cx="80" cy="60" r="30" fill="#FFFFFF" />
        {/* Minimal Net */}
        <Path d="M60 40 H100 L90 80 H70 Z" stroke="#E8E8E8" strokeWidth="3" fill="none" />
        {/* Ball */}
        <Circle cx="80" cy="30" r="12" fill="#F47A20" />
      </Svg>
    </View>
  );
}

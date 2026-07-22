import React from 'react';
import { View, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { Title, Label, MonoText } from '@/components/ui/Typography';
import { AIContainer } from '@/components/ui/AIContainer';
import { Trophy } from 'lucide-react-native';

const MOCK_LEADERBOARD = [
  { id: 1, name: 'Optimus_Prime', score: 98.4, rank: 1, trend: 'up' },
  { id: 2, name: 'Hoops_AI', score: 97.2, rank: 2, trend: 'up' },
  { id: 3, name: 'Operator_01', score: 95.8, rank: 3, trend: 'stable', isMe: true },
  { id: 4, name: 'Jordan_Bot', score: 94.1, rank: 4, trend: 'down' },
  { id: 5, name: 'Curry_Protocol', score: 93.9, rank: 5, trend: 'up' },
  { id: 6, name: 'Net_Seeker', score: 92.5, rank: 6, trend: 'down' },
  { id: 7, name: 'Swish_Alg', score: 91.0, rank: 7, trend: 'stable' },
];

export default function LeaderboardScreen() {
  return (
    <AIContainer safeArea={true}>
      <View className="px-6 pt-6 mb-4">
        <MonoText className="text-neural/70 mb-1">// GLOBAL NETWORK</MonoText>
        <Title>Top Operatives</Title>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1 px-6">
        
        <MotiView
          from={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 800 }}
          className="bg-accent/10 border border-accent/20 rounded-2xl p-6 mb-8 items-center flex-row"
        >
          <View className="w-12 h-12 rounded-full bg-accent/20 items-center justify-center mr-4">
            <Trophy color="#F47A20" size={24} />
          </View>
          <View className="flex-1">
            <Label className="text-white text-sm">Season 4 Active</Label>
            <MonoText className="text-secondary-text text-[10px] mt-1">ENDS IN 12:45:00</MonoText>
          </View>
          <View className="items-end">
            <MonoText className="text-accent text-lg">RANK #3</MonoText>
          </View>
        </MotiView>

        <View className="flex-row justify-between mb-4 px-2">
          <Label className="text-secondary-text text-xs">OP_ID</Label>
          <Label className="text-secondary-text text-xs">SYS_SCORE</Label>
        </View>

        {MOCK_LEADERBOARD.map((item, index) => (
          <MotiView 
            key={item.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 100 + (index * 100) }}
            className={`flex-row items-center justify-between p-4 mb-2 rounded-xl border ${
              item.isMe 
                ? 'bg-neural/10 border-neural/30' 
                : 'bg-card border-border'
            }`}
          >
            <View className="flex-row items-center">
              <MonoText className={`w-6 text-center mr-3 ${item.rank <= 3 ? 'text-accent' : 'text-secondary-text'}`}>
                {item.rank}
              </MonoText>
              <View>
                <Label className={`mb-1 ${item.isMe ? 'text-neural' : 'text-white'}`}>
                  {item.name}
                </Label>
                <MonoText className="text-[10px] text-secondary-text">
                  UUID_{item.id}00X
                </MonoText>
              </View>
            </View>
            <View className="items-end">
              <MonoText className="text-white text-[15px]">{item.score.toFixed(1)}</MonoText>
            </View>
          </MotiView>
        ))}

      </ScrollView>
    </AIContainer>
  );
}

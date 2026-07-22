import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Title, Body, Label } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CheckCircle2 } from 'lucide-react-native';

const HAND_OPTIONS = ['Right', 'Left', 'Ambidextrous'];

export default function Step3Screen() {
  const router = useRouter();
  const [selectedHand, setSelectedHand] = useState('Right');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  return (
    <View className="flex-1 bg-primary-bg">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 px-6 pt-8 pb-10 justify-between">
          
          <View>
            <MotiView 
              from={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800 }}
              className="mb-8"
            >
              <Title className="mb-2 text-3xl">Physical Metrics</Title>
              <Body>Helps calibrate the AI biomechanical model.</Body>
            </MotiView>

            <MotiView 
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 200 }}
              className="w-full mb-8"
            >
              <Label className="text-secondary-text mb-4 text-xs tracking-widest">DOMINANT SHOOTING HAND</Label>
              <View className="flex-row flex-wrap gap-3">
                {HAND_OPTIONS.map((hand) => {
                  const isSelected = selectedHand === hand;
                  return (
                    <Pressable
                      key={hand}
                      onPress={() => setSelectedHand(hand)}
                      className={`px-5 py-3 rounded-xl border flex-row items-center transition-colors ${
                        isSelected ? 'bg-accent/10 border-accent' : 'bg-card border-border'
                      }`}
                    >
                      {isSelected && <CheckCircle2 color="#F47A20" size={16} className="mr-2" />}
                      <Label className={isSelected ? 'text-accent font-semibold' : 'text-white'}>
                        {hand}
                      </Label>
                    </Pressable>
                  );
                })}
              </View>
            </MotiView>

            <MotiView 
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 300 }}
              className="w-full flex-row space-x-4"
            >
              <View className="flex-1">
                <Input 
                  label="HEIGHT (CM)"
                  placeholder="185"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="number-pad"
                />
              </View>
              <View className="flex-1 ml-4">
                <Input 
                  label="WEIGHT (KG)"
                  placeholder="85"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="number-pad"
                />
              </View>
            </MotiView>
          </View>

          <MotiView 
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 800, delay: 400 }}
            className="mt-auto pt-8"
          >
            <Button 
              label="Continue" 
              onPress={() => router.push('/(onboarding)/step-4')}
            />
          </MotiView>

        </View>
      </ScrollView>
    </View>
  );
}

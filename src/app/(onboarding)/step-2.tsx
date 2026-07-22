import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { Title, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function Step2Screen() {
  const router = useRouter();
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const isValid = month.length >= 1 && day.length >= 1 && year.length === 4;

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
              <Title className="mb-2 text-3xl">When's your birthday?</Title>
              <Body>Used to tailor your training benchmarks.</Body>
            </MotiView>

            <MotiView 
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 800, delay: 200 }}
              className="flex-row justify-between w-full space-x-4"
            >
              <View className="flex-[1.5]">
                <Input 
                  placeholder="MM"
                  value={month}
                  onChangeText={setMonth}
                  keyboardType="number-pad"
                  maxLength={2}
                  className="text-center text-lg"
                  autoFocus
                />
              </View>
              <View className="flex-[1.5] mx-2">
                <Input 
                  placeholder="DD"
                  value={day}
                  onChangeText={setDay}
                  keyboardType="number-pad"
                  maxLength={2}
                  className="text-center text-lg"
                />
              </View>
              <View className="flex-[2]">
                <Input 
                  placeholder="YYYY"
                  value={year}
                  onChangeText={setYear}
                  keyboardType="number-pad"
                  maxLength={4}
                  className="text-center text-lg"
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
              onPress={() => router.push('/(onboarding)/step-3')}
              disabled={!isValid}
              className={!isValid ? 'opacity-50' : ''}
            />
          </MotiView>

        </View>
      </ScrollView>
    </View>
  );
}

import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView, AnimatePresence } from 'moti';
import { AIContainer } from '@/components/ui/AIContainer';
import { HeroTitle, Body, Title } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/api/client';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function DataCollectionScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    gender: '',
    birthday: new Date(2005, 0, 1),
    experienceLevel: '',
    currentStatus: '',
    dribbleHand: '',
  });

  const TOTAL_STEPS = 5;

  const nextStep = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
    else submitData();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const submitData = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      await apiClient.post('/auth/details', formData);
      await updateUser({ hasCompletedOnboarding: true });
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Failed to save details:', error);
      // Fallback: let them in if we fail in dev, ideally show toast
      await updateUser({ hasCompletedOnboarding: true });
      router.replace('/(tabs)');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return formData.gender !== '';
      case 2: return true; // Date always has a default
      case 3: return formData.experienceLevel !== '';
      case 4: return formData.currentStatus !== '';
      case 5: return formData.dribbleHand !== '';
      default: return false;
    }
  };

  const renderOptions = (field: keyof typeof formData, options: { label: string, value: string, icon?: string }[]) => {
    return (
      <View className="space-y-6 mt-6 w-full">
        {options.map((option) => {
          const isSelected = formData[field] === option.value;
          return (
            <Pressable
              key={option.value}
              onPress={() => setFormData({ ...formData, [field]: option.value })}
              className={`w-full p-6 rounded-3xl border-2 ${
                isSelected ? 'border-accent bg-accent/10' : 'border-border/50 bg-secondary-bg/30'
              } flex-row items-center justify-between`}
            >
              <View className="flex-row items-center">
                {option.icon && <Title className="mr-4 text-3xl">{option.icon}</Title>}
                <Title className={`text-xl ${isSelected ? 'text-accent' : 'text-white'}`}>
                  {option.label}
                </Title>
              </View>
              <View className={`w-7 h-7 rounded-full border-2 items-center justify-center ${
                isSelected ? 'border-accent bg-accent' : 'border-border/70'
              }`}>
                {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-primary-bg" />}
              </View>
            </Pressable>
          );
        })}
      </View>
    );
  };

  return (
    <AIContainer className="bg-primary-bg" safeArea={true}>
      <View className="flex-1 px-6 pt-4 pb-8">
        
        {/* Progress Bar */}
        <View className="w-full h-1.5 bg-secondary-bg rounded-full overflow-hidden mb-4 mt-4">
          <MotiView 
            className="h-full bg-accent"
            animate={{ width: `${((step - 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ type: 'timing', duration: 400 }}
          />
        </View>

        <View className="flex-1">
          <AnimatePresence exitBeforeEnter>
            {step === 1 && (
              <MotiView
                key="step1"
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -50 }}
                className="flex-1 justify-center pb-12"
              >
                <HeroTitle className="mb-2 text-center">What is your gender?</HeroTitle>
                <Body className="text-secondary-text mb-6 text-center">This helps us tailor physical benchmarks.</Body>
                {renderOptions('gender', [
                  { label: 'Male', value: 'Male', icon: '👨' },
                  { label: 'Female', value: 'Female', icon: '👩' },
                ])}
              </MotiView>
            )}

            {step === 2 && (
              <MotiView
                key="step2"
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -50 }}
                className="flex-1 justify-center pb-12"
              >
                <HeroTitle className="mb-2 text-center">When is your birthday?</HeroTitle>
                <Body className="text-secondary-text mb-8 text-center">Used to calculate age-appropriate development plans.</Body>
                
                <View className="items-center justify-center p-4 bg-secondary-bg/20 rounded-3xl border border-border/30 w-full">
                  <DateTimePicker
                    mode="single"
                    date={formData.birthday}
                    onChange={(params) => {
                      if (params.date) {
                        setFormData({ ...formData, birthday: dayjs(params.date).toDate() });
                      }
                    }}
                    styles={{
                      day_label: { color: '#FFFFFF' },
                      selected: { backgroundColor: '#F47A20' },
                      selected_label: { color: '#FFFFFF' },
                      month_selector_label: { color: '#FFFFFF' },
                      year_selector_label: { color: '#FFFFFF' },
                      weekday_label: { color: '#A1A1AA' },
                      button_prev_image: { tintColor: '#F47A20' },
                      button_next_image: { tintColor: '#F47A20' },
                      months: { backgroundColor: 'transparent' },
                      years: { backgroundColor: 'transparent' },
                      month_label: { color: '#FFFFFF' },
                      selected_month: { backgroundColor: '#F47A20' },
                      selected_month_label: { color: '#FFFFFF' },
                      year_label: { color: '#FFFFFF' },
                      selected_year: { backgroundColor: '#F47A20' },
                      selected_year_label: { color: '#FFFFFF' },
                      active_year: { backgroundColor: '#F47A2050' },
                      active_year_label: { color: '#FFFFFF' },
                    }}
                  />
                </View>
              </MotiView>
            )}

            {step === 3 && (
              <MotiView
                key="step3"
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -50 }}
                className="flex-1 justify-center pb-12"
              >
                <HeroTitle className="mb-2 text-center">Basketball Experience</HeroTitle>
                <Body className="text-secondary-text mb-4 text-center">How long have you been playing?</Body>
                {renderOptions('experienceLevel', [
                  { label: 'Beginner (0-2 years)', value: 'Beginner', icon: '🌱' },
                  { label: 'Intermediate (3-5 years)', value: 'Intermediate', icon: '🔥' },
                  { label: 'Advanced (5+ years)', value: 'Advanced', icon: '⭐' },
                  { label: 'Elite (Pro / College)', value: 'Elite', icon: '🏆' },
                ])}
              </MotiView>
            )}

            {step === 4 && (
              <MotiView
                key="step4"
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -50 }}
                className="flex-1 justify-center pb-12"
              >
                <HeroTitle className="mb-2 text-center">Current Status</HeroTitle>
                <Body className="text-secondary-text mb-4 text-center">What's your current playing situation?</Body>
                {renderOptions('currentStatus', [
                  { label: 'Currently playing in a team', value: 'Team', icon: '🏀' },
                  { label: 'Have a personal trainer', value: 'Trainer', icon: '💪' },
                  { label: 'Casual / Pickup games', value: 'Casual', icon: '👟' },
                  { label: 'Just starting to learn', value: 'Learning', icon: '📖' },
                  { label: 'Others', value: 'Others', icon: '✨' },
                ])}
              </MotiView>
            )}

            {step === 5 && (
              <MotiView
                key="step5"
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -50 }}
                className="flex-1 justify-center pb-12"
              >
                <HeroTitle className="mb-2 text-center">Dominant Hand</HeroTitle>
                <Body className="text-secondary-text mb-4 text-center">Which hand do you prefer to dribble and shoot with?</Body>
                {renderOptions('dribbleHand', [
                  { label: 'Right Hand', value: 'Right', icon: '👉' },
                  { label: 'Left Hand', value: 'Left', icon: '👈' },
                  { label: 'Ambidextrous', value: 'Ambidextrous', icon: '🤲' },
                ])}
              </MotiView>
            )}
          </AnimatePresence>
        </View>

        {/* Bottom Actions */}
        <View className="flex-row items-center space-x-4 pt-4 mt-auto">
          {step > 1 && (
            <Button 
              label="Back" 
              variant="outline" 
              className="flex-1 h-14 rounded-full" 
              onPress={prevStep}
              disabled={isSubmitting}
            />
          )}
          <Button 
            label={isSubmitting ? "Saving..." : step === TOTAL_STEPS ? "Complete" : "Continue"}
            className="flex-[2] h-14 rounded-full"
            onPress={nextStep}
            disabled={!isStepValid() || isSubmitting}
          />
        </View>
      </View>
    </AIContainer>
  );
}

import React, { useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView, AnimatePresence } from 'moti';
import { AIContainer } from '@/components/ui/AIContainer';
import { HeroTitle, Body, Title } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/api/client';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

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
      <View className="space-y-4 mt-8 w-full">
        {options.map((option) => {
          const isSelected = formData[field] === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              onPress={() => setFormData({ ...formData, [field]: option.value })}
              className={`w-full p-5 rounded-2xl border ${
                isSelected ? 'border-brand-primary bg-brand-primary/10' : 'border-border/50 bg-secondary-bg/30'
              } flex-row items-center justify-between`}
            >
              <View className="flex-row items-center">
                {option.icon && <Title className="mr-4 text-3xl">{option.icon}</Title>}
                <Title className={`text-lg ${isSelected ? 'text-brand-primary' : 'text-white'}`}>
                  {option.label}
                </Title>
              </View>
              <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                isSelected ? 'border-brand-primary' : 'border-border'
              }`}>
                {isSelected && <View className="w-3 h-3 rounded-full bg-brand-primary" />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <AIContainer className="bg-primary-bg" safeArea={true}>
      <View className="flex-1 px-6 pt-4 pb-8">
        
        {/* Progress Bar */}
        <View className="w-full h-1.5 bg-secondary-bg rounded-full overflow-hidden mb-8 mt-4">
          <MotiView 
            className="h-full bg-brand-primary"
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ type: 'timing', duration: 300 }}
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
                className="flex-1"
              >
                <HeroTitle className="mb-2">What is your gender?</HeroTitle>
                <Body className="text-secondary-text mb-4">This helps us tailor physical benchmarks.</Body>
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
                className="flex-1"
              >
                <HeroTitle className="mb-2">When is your birthday?</HeroTitle>
                <Body className="text-secondary-text mb-8">Used to calculate age-appropriate development plans.</Body>
                
                <View className="items-center justify-center py-10 bg-secondary-bg/20 rounded-3xl border border-border/30 overflow-hidden">
                  {Platform.OS === 'android' && !showDatePicker && (
                    <Button 
                      label={formData.birthday.toLocaleDateString()} 
                      onPress={() => setShowDatePicker(true)}
                      variant="outline"
                    />
                  )}
                  {(showDatePicker || Platform.OS === 'ios') && (
                    <DateTimePicker
                      value={formData.birthday}
                      mode="date"
                      display="spinner"
                      textColor="#FFFFFF"
                      onChange={(event, date) => {
                        if (Platform.OS === 'android') setShowDatePicker(false);
                        if (date) setFormData({ ...formData, birthday: date });
                      }}
                      style={{ width: 320, height: 200 }}
                    />
                  )}
                </View>
              </MotiView>
            )}

            {step === 3 && (
              <MotiView
                key="step3"
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -50 }}
                className="flex-1"
              >
                <HeroTitle className="mb-2">Basketball Experience</HeroTitle>
                <Body className="text-secondary-text mb-4">How long have you been playing?</Body>
                {renderOptions('experienceLevel', [
                  { label: 'Beginner (0-2 years)', value: 'Beginner' },
                  { label: 'Intermediate (3-5 years)', value: 'Intermediate' },
                  { label: 'Advanced (5+ years)', value: 'Advanced' },
                  { label: 'Elite (Pro / College)', value: 'Elite' },
                ])}
              </MotiView>
            )}

            {step === 4 && (
              <MotiView
                key="step4"
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -50 }}
                className="flex-1"
              >
                <HeroTitle className="mb-2">Current Status</HeroTitle>
                <Body className="text-secondary-text mb-4">What's your current playing situation?</Body>
                {renderOptions('currentStatus', [
                  { label: 'Currently playing in a team', value: 'Team' },
                  { label: 'Have a personal trainer', value: 'Trainer' },
                  { label: 'Casual / Pickup games', value: 'Casual' },
                  { label: 'Just starting to learn', value: 'Learning' },
                ])}
              </MotiView>
            )}

            {step === 5 && (
              <MotiView
                key="step5"
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                exit={{ opacity: 0, translateX: -50 }}
                className="flex-1"
              >
                <HeroTitle className="mb-2">Dominant Hand</HeroTitle>
                <Body className="text-secondary-text mb-4">Which hand do you prefer to dribble and shoot with?</Body>
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

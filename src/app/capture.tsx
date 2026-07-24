import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { MotiView, AnimatePresence } from 'moti';
import { BlurView } from 'expo-blur';
import { Title, MonoText, Label, Body } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';
import { X, Camera, RefreshCw, Upload, Video, Activity } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

type CaptureMode = 'select' | 'record' | 'uploading' | 'ready' | 'analyzing';

export default function CaptureScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<CaptureMode>('select');
  const [progress, setProgress] = useState(0);

  const pickVideo = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      startSimulatedUpload();
    }
  };

  const recordVideo = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Camera permissions are required to record video.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['videos'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      startSimulatedUpload();
    }
  };

  const startSimulatedUpload = () => {
    setMode('uploading');
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setMode('ready');
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 400);
  };

  const startAnalysis = () => {
    setMode('analyzing');
    // Simulate analyzing time before routing
    setTimeout(() => {
      router.replace('/analysis/sim-01');
    }, 2000);
  };

  // 1. SELECT MODE
  if (mode === 'select') {
    return (
      <View className="flex-1 bg-primary-bg px-6 pt-16">
        <View className="flex-row justify-between items-center mb-12">
          <Pressable 
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-secondary-bg items-center justify-center border border-border"
          >
            <X color="#FFF" size={20} />
          </Pressable>
          <MonoText className="text-neural/70">// DATA ACQUISITION</MonoText>
          <View className="w-10" />
        </View>

        <Title className="text-3xl mb-4 text-center">Acquire Footage</Title>
        <Body className="text-center text-secondary-text mb-12">
          Choose a method to provide your basketball footage for biomechanical analysis.
        </Body>

        <View style={{ gap: 24 }}>
          <Pressable 
            onPress={recordVideo}
            className="w-full bg-secondary-bg/50 border border-border rounded-3xl p-8 items-center justify-center"
          >
            <View className="w-16 h-16 rounded-full bg-accent/20 items-center justify-center mb-4">
              <Video color="#F47A20" size={32} />
            </View>
            <Title className="text-xl mb-2">Record Video</Title>
            <Body className="text-center text-sm text-secondary-text">
              Use our AR camera to capture your shot in real-time.
            </Body>
          </Pressable>

          <Pressable 
            onPress={pickVideo}
            className="w-full bg-secondary-bg/50 border border-border rounded-3xl p-8 items-center justify-center"
          >
            <View className="w-16 h-16 rounded-full bg-neural/20 items-center justify-center mb-4">
              <Upload color="#00F0FF" size={32} />
            </View>
            <Title className="text-xl mb-2">Upload Video</Title>
            <Body className="text-center text-sm text-secondary-text">
              Select an existing video from your device gallery.
            </Body>
          </Pressable>
        </View>
      </View>
    );
  }

  // 2. UPLOADING / READY / ANALYZING MODE
  if (mode === 'uploading' || mode === 'ready' || mode === 'analyzing') {
    return (
      <View className="flex-1 bg-primary-bg px-6 pt-16 items-center justify-center">
        <MotiView
          animate={{ scale: mode === 'analyzing' ? [1, 1.1, 1] : 1 }}
          transition={{ loop: mode === 'analyzing', duration: 1500 }}
          className="w-32 h-32 rounded-full border-4 border-secondary-bg items-center justify-center relative mb-8"
        >
          {mode === 'uploading' && (
            <Text className="text-white text-3xl font-bold">{Math.min(progress, 100)}%</Text>
          )}
          {mode === 'ready' && <Video color="#00F0FF" size={48} />}
          {mode === 'analyzing' && <Activity color="#F47A20" size={48} />}

          {/* Progress ring simulation */}
          {mode === 'uploading' && (
            <MotiView 
              animate={{ rotate: '360deg' }}
              transition={{ loop: true, duration: 2000, type: 'timing' }}
              className="absolute inset-0 rounded-full border-t-4 border-neural" 
            />
          )}
        </MotiView>

        <Title className="text-2xl mb-2 text-center">
          {mode === 'uploading' ? 'Uploading Footage...' : mode === 'ready' ? 'Upload Complete' : 'Analyzing Biomechanics...'}
        </Title>
        <Body className="text-center text-secondary-text mb-12">
          {mode === 'uploading' 
            ? 'Securely transferring video to processing server.' 
            : mode === 'ready'
            ? 'Video is ready for AI breakdown.'
            : 'Applying pose estimation models and calculating telemetry...'}
        </Body>

        {mode === 'ready' && (
          <Button 
            label="START ANALYSIS" 
            fullWidth 
            className="rounded-full h-14"
            onPress={startAnalysis}
          />
        )}
      </View>
    );
  }

  // 3. RECORD MODE (AR Camera Simulation)
  return (
    <View className="flex-1 bg-primary-bg relative">
      <View className="absolute inset-0 bg-[#0F111A] items-center justify-center">
        <MotiView 
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 1500, loop: true, repeatReverse: true }}
        >
          <MonoText className="text-secondary-text/30 text-2xl text-center">
            [ CAMERA FEED ]{'\n'}INITIALIZING...
          </MonoText>
        </MotiView>
      </View>

      <View style={StyleSheet.absoluteFill} pointerEvents="none" className="justify-center items-center">
        <View className="absolute inset-0 border-[0.5px] border-neural/10" style={{ margin: '10%' }} />
        
        <MotiView
          from={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 500 }}
          className="w-64 h-96 border border-neural/50 items-center justify-between py-10"
        >
          <View className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neural" />
          <View className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neural" />
          <View className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neural" />
          <View className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neural" />
          
          <MonoText className="text-neural/80 text-xs text-center w-full mt-4">
            ALIGN SUBJECT{'\n'}WITHIN BOUNDS
          </MonoText>
          
          <View className="w-full flex-row justify-between px-8">
            <View className="w-1.5 h-1.5 bg-accent rounded-full" />
            <View className="w-1.5 h-1.5 bg-accent rounded-full" />
          </View>
        </MotiView>
      </View>

      <View className="pt-14 px-6 flex-row justify-between items-center z-10">
        <Pressable 
          onPress={() => setMode('select')}
          className="w-10 h-10 rounded-full bg-black/50 items-center justify-center border border-white/10"
        >
          <X color="#FFF" size={20} />
        </Pressable>
        <BlurView intensity={20} tint="dark" className="px-4 py-1.5 rounded-full overflow-hidden border border-white/10">
          <MonoText className="text-neural text-[10px]">LENS_CALIBRATED</MonoText>
        </BlurView>
        <Pressable className="w-10 h-10 rounded-full bg-black/50 items-center justify-center border border-white/10">
          <RefreshCw color="#FFF" size={18} />
        </Pressable>
      </View>

      <View className="absolute bottom-0 left-0 right-0 pb-12 pt-8 px-8 items-center justify-center z-10 bg-gradient-to-t from-primary-bg to-transparent">
        <Pressable onPress={startAnalysis} className="items-center">
          <MotiView
            from={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: 'timing', duration: 1000, loop: true, repeatReverse: true }}
            className="w-20 h-20 rounded-full border-2 border-accent items-center justify-center p-1"
          >
            <View className="w-full h-full rounded-full bg-accent items-center justify-center">
              <Camera color="#FFF" size={28} />
            </View>
          </MotiView>
          <MonoText className="mt-4 text-white text-xs tracking-widest">RECORD & ANALYZE</MonoText>
        </Pressable>
      </View>
    </View>
  );
}


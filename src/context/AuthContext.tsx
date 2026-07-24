import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { apiClient } from '@/api/client';
import { useRouter, useSegments } from 'expo-router';

// Define the User shape matching our Backend Prisma Schema
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  hasCompletedOnboarding: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (token: string, userData: User) => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const segments = useSegments();
  const router = useRouter();

  // On App Boot: Check if a token exists securely
  useEffect(() => {
    async function loadStoredSession() {
      try {
        const storedToken = await SecureStore.getItemAsync('aimpoint_jwt');
        const storedUser = await SecureStore.getItemAsync('aimpoint_user');

        if (storedToken && storedUser) {
          // In a full production app, you would verify this token with the backend first
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load session:', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadStoredSession();
  }, []);

  // Global Routing Logic
  useEffect(() => {
    if (isLoading) return;

    const inTabsGroup = segments[0] === '(tabs)' || segments[0] === 'analysis' || segments[0] === 'capture';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inPublicGroup = segments[0] === '(auth)' || segments[0] === 'carousel';

    if (!user) {
      if (inTabsGroup || inOnboardingGroup) {
        // Not logged in -> Kick to public
        router.replace('/(auth)');
      }
    } else {
      // User IS logged in
      if (!user.hasCompletedOnboarding) {
        // Needs onboarding -> Kick to data collection
        if (!inOnboardingGroup) {
          router.replace('/(onboarding)/data-collection');
        }
      } else {
        // Completed onboarding -> Kick to Dashboard if in public or onboarding screens
        if (inPublicGroup || inOnboardingGroup) {
          router.replace('/(tabs)');
        }
      }
    }
  }, [user, segments, isLoading]);

  const signIn = async (token: string, userData: User) => {
    await SecureStore.setItemAsync('aimpoint_jwt', token);
    await SecureStore.setItemAsync('aimpoint_user', JSON.stringify(userData));
    setUser(userData);
  };

  const updateUser = async (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      await SecureStore.setItemAsync('aimpoint_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('aimpoint_jwt');
    await SecureStore.deleteItemAsync('aimpoint_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, updateUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

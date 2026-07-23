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
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (token: string, userData: User) => Promise<void>;
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

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // User is not logged in but trying to access a secure screen -> Kick them to login
      router.replace('/(auth)');
    } else if (user && inAuthGroup) {
      // User is logged in but stuck in the auth screens -> Push them to dashboard
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading]);

  const signIn = async (token: string, userData: User) => {
    await SecureStore.setItemAsync('aimpoint_jwt', token);
    await SecureStore.setItemAsync('aimpoint_user', JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('aimpoint_jwt');
    await SecureStore.deleteItemAsync('aimpoint_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Determine localhost URL based on platform (Android emulator vs iOS simulator/web)
// Note: If testing on a PHYSICAL device, you must use your computer's actual Wi-Fi IP address here!
const LOCALHOST = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

const API_URL = process.env.EXPO_PUBLIC_API_URL || LOCALHOST;

export const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically attach the JWT token to every request
apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('aimpoint_jwt');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

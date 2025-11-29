import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HyperbaricDashboard from './src/components/HyperbaricDashboard';

export default function App() {
  return (
    <SafeAreaProvider>
      <HyperbaricDashboard />
    </SafeAreaProvider>
  );
}

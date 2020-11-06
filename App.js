import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import Routes from './src/routes';
import { AuthProvider } from './src/hooks/useAuth';

export default function App() {
  return (
      <>
        <StatusBar style="dark" animated backgroundColor="#f5f5f5"   />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </>
  );
}
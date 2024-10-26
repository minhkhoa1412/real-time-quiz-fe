import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';
import { authStore } from '../stores/AuthStore/AuthStore';
import { useRxStore } from '../hooks/Store';

export const RootStack = () => {
  const accessToken = useRxStore({
    defaultValue: authStore.accessToken,
    subject: authStore.accessTokenSubject,
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {!!accessToken ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

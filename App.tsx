import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as UrqlProvider } from 'urql';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { client } from './src/api/client';
import { theme } from './src/styles/theme';

const App = () => {
  return (
    <UrqlProvider value={client}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} />
        <AppNavigator />
      </NavigationContainer>
    </UrqlProvider>
  );
};

export default App;

import React from 'react';
import './App.css';

// Import from react core components
import {
  ThemeProvider as RMWCThemeProvider,
  RMWCProvider,
  Themes,
} from '@map-colonies/react-core';
import { CssBaseline } from '@map-colonies/react-components';
import { useMediaQuery } from '@map-colonies/react-components';
import '@map-colonies/react-core/dist/rmwc/styles';

import View from './components/View';

const App: React.FC = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? Themes.darkTheme : Themes.lightTheme;

  return (
    <RMWCProvider
      typography={{
        body1: 'p',
      }}
    >
      <RMWCThemeProvider options={theme}>
        <CssBaseline />
        <View />
      </RMWCThemeProvider>
    </RMWCProvider>
  );
};

export default App;

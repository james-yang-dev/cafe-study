import React from 'react';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './components/style';
import Routes from './routes/Routes';

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Routes />
    </RecoilRoot>
  );
}

export default App;

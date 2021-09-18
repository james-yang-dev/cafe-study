import React from 'react'
import { RecoilRoot } from 'recoil'
import Routes from './routes/Routes';

function App() {
  return (
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  );
}

export default App;

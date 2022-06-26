import React from 'react';
import { useConnect } from 'wagmi';
import NotConnectedPage from '../src/not_connected';
import ConnectedPage from '../src/connected';

function Home() {
  const { isConnected } = useConnect();

  return (
    isConnected ? <ConnectedPage /> : <NotConnectedPage />
  );
}

export default Home;

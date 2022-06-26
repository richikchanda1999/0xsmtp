import {
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import NotConnectedPage from '../src/not_connected';
import { useConnect, useSignMessage } from 'wagmi';
import ConnectedPage from '../src/connected';

function Home() {
  const { isConnected } = useConnect();

  return (
    isConnected ? <ConnectedPage /> : <NotConnectedPage />
  );
}

export default Home;

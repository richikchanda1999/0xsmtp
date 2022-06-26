import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useConnect } from "wagmi";

function NotConnectedPage() {
  const { connect, connectors } = useConnect();

  const onConnect = () => {
    connect(connectors[0]);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Button onClick={onConnect}>Connect</Button>
    </Flex>
  );
}

export default NotConnectedPage;

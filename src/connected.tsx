import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { useDisconnect } from "wagmi";

function ConnectedPage() {

  const { disconnect } = useDisconnect() 

  const [fromAddress, setFormAddress] = React.useState("");
  const [toAddress, setToAddress] = React.useState("");

  const onClick = async () => {};

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex direction="column" w="60%">
        <Input
          type="email"
          placeholder="The 0x email address"
          value={fromAddress}
          onChange={(v) => {
            setFormAddress(v.target.value);
          }}
        />
        <Input
          type="email"
          placeholder="The forwarded-to email address"
          mt={4}
          value={toAddress}
          onChange={(v) => {
            setToAddress(v.target.value);
          }}
        />
        <Button mt={8} onClick={onClick}>
          Forward
        </Button>
        <Button mt={8} onClick={() => {
            disconnect()
        }}>
          Disconnect
        </Button>
      </Flex>
    </Flex>
  );
}

export default ConnectedPage

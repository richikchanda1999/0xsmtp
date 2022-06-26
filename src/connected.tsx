import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

function ConnectedPage() {
  const { data: accountData } = useAccount();
  const { disconnect } = useDisconnect();

  const [toAddress, setToAddress] = React.useState("");
  const { signMessageAsync } = useSignMessage();

  const onClick = async () => {
    console.log(accountData?.address, toAddress);
    if (!accountData || !accountData?.address || toAddress === "")
      return;

    const signedMessage = await signMessageAsync({message: `I allow mails to be forwarded to ${toAddress}`});
    const json = {
      fromAddress: accountData.address,
      toAddress,
      message: signedMessage,
    };

    console.log('To API: ', json)
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex direction="column" w="60%">
        <Text textAlign="center">Your address: {accountData?.address}</Text>
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
        <Button
          mt={8}
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect
        </Button>
      </Flex>
    </Flex>
  );
}

export default ConnectedPage;

import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

function ConnectedPage() {
  const { data: accountData } = useAccount();
  const { disconnect } = useDisconnect();

  const [toAddress, setToAddress] = React.useState("");
  const { signMessageAsync } = useSignMessage();

  const toast = useToast()

  const onClick = async () => {
    console.log(accountData?.address, toAddress);
    if (!accountData || !accountData?.address || toAddress === "")
      return;

    const signedMessage = await signMessageAsync({message: `I allow mails to be forwarded to ${toAddress}`});
    const json = {
      forwardfrom: accountData.address,
      forwardto: toAddress,
      signature: signedMessage,
    };

    console.log('To API: ', json)

    fetch('https://api.0xmail.org/create', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      toast({
        title: "Success",
        description: "Mapping done!",
        status: "success",
      });
      setToAddress('')
    })
    .catch((error) => {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Some error occurred!",
        status: "error",
      });
    });
  }
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

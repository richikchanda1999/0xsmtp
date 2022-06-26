import React, {
	createContext,
	ReactElement,
	ReactNode,
	useMemo,
} from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import {
	allChains,
	configureChains,
	createClient,
	WagmiConfig,
} from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID

const { chains, provider } = configureChains(allChains, [
	publicProvider(),
])

// Set up client
const client = createClient({
	autoConnect: true,
	connectors: [
		new InjectedConnector({
			chains,
			options: {
				name: 'Injected',
				shimDisconnect: true,
			},
		}),
		new MetaMaskConnector({
			chains,
			options: {
				shimDisconnect: true,
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				infuraId,
				qrcode: true,
			},
		}),
	],
	provider,
})
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	return (
		<>
			<WagmiConfig client={client}>
					<ChakraProvider>
						<Component {...pageProps} />
					</ChakraProvider>
			</WagmiConfig>
		</>
	)
}

// MyApp.getInitialProps = async(appContext: AppContext) => {
// 	// calls page's `getInitialProps` and fills `appProps.pageProps`
// 	const appProps = await App.getInitialProps(appContext)
// 	return { ...appProps }
// }

// export default dynamic(() => Promise.resolve(MyApp), {
//   ssr: false,
// });
export default MyApp

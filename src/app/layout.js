import { Inter } from 'next/font/google'
import './globals.css'
import { LivePeerProvider } from './lib/livepeer'
import client from "./lib/client";
import { ApolloWrapper } from './lib/apollo-wrapper';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Youtube Decentralized',
  description: 'Youtube clone with web3 integration',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <LivePeerProvider>{children}</LivePeerProvider>
        </ApolloWrapper>
      </body>
    </html>
    
  )
}

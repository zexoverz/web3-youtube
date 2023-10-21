'use client'

import { createReactClient, studioProvider, LivepeerConfig } from "@livepeer/react";

const LivePeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_LIVE_PEER_TOKEN }),
});

export function LivePeerProvider({ children }) {
    return <LivepeerConfig client={LivePeerClient}>{children}</LivepeerConfig>
}
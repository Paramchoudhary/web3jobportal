import {
    liskSepolia, mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from "wagmi/chains"
import { getDefaultConfig } from '@rainbow-me/rainbowkit';




export const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, polygon, optimism, liskSepolia, arbitrum, base],
    ssr: false, // If your dApp uses server side rendering (SSR)
});
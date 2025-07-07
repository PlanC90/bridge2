import { NetworkData } from '../types';

export const networks: NetworkData[] = [
  {
    id: 'electra',
    name: 'ElectraProtocol',
    profileImage: 'https://pbs.twimg.com/profile_images/1331917259191808000/E1UyOz3m_400x400.png',
    description: 'Next-generation blockchain protocol',
    socialLinks: [],
    hasMainnetInfo: true, // Keep for Electra
    explorerUrl: 'https://electraprotocol.network',
    bridgeUrl: ''
  },
  {
    id: 'omax',
    name: 'OMAX',
    profileImage: 'https://pbs.twimg.com/profile_images/1770163638512373760/TYC8AghW_400x400.jpg',
    description: 'OMAX Blockchain Network',
    socialLinks: [],
    networkConfig: {
      networkName: 'OMAX Mainnet',
      rpcUrl: 'https://mainapi.omaxray.com',
      chainId: 311,
      symbol: 'OMAX',
			explorerUrl: 'https://omaxscan.com',
      tokenAddress: '0x96CBE66C162Ada7F3f98E7AAF35Ffc57f222725C'
    },
    explorerUrl: 'https://omaxscan.com',
    bridgeUrl: 'https://bridge.memextoken.org/omax'
  },
  {
    id: 'shibarium',
    name: 'Shibarium',
    profileImage: 'https://pbs.twimg.com/profile_images/1781007982236401664/Ce2gwqjc_400x400.jpg',
    description: 'Shiba Inu Layer 2 Solution',
    socialLinks: [],
    networkConfig: {
      networkName: 'Shibarium',
      rpcUrl: 'https://www.shibrpc.com',
      chainId: 109,
      symbol: 'BONE',
			explorerUrl: 'https://shibariumscan.io',
      tokenAddress: '0xBB95050f59ACCA5045D89E142d606C82A627aD60'
    },
    explorerUrl: 'https://shibariumscan.io',
    bridgeUrl: 'https://bridge.memextoken.org/shibarium'
  },
  {
    id: 'areon',
    name: 'Areon Network',
    profileImage: 'https://pbs.twimg.com/profile_images/1799036506486759424/qf_BWOlm_400x400.jpg',
    description: 'Areon Layer 1 Blockchain',
    socialLinks: [], // Add actual social links if available
    hasMainnetInfo: false, // Set to false to remove the button
    networkConfig: {
      networkName: 'Areon Network',
      rpcUrl: 'https://mainnet-rpc.areon.network', // Example RPC URL, verify if correct
      chainId: 463, // Example Chain ID, verify if correct
      symbol: 'AREA', // Example Symbol, verify if correct
      explorerUrl: 'https://areonscan.com', // Example Explorer URL, verify if correct
      tokenAddress: '0x9437f9dcab77688221878b1a111def408f43ec5a' // Add token address if applicable
    },
    explorerUrl: 'https://areonscan.com', // Example Explorer URL, verify if correct
    bridgeUrl: 'https://bridge.memextoken.org/areon' // Example Bridge URL, verify if correct
  },
  {
    id: 'bnb',
    name: 'BNB Chain',
    profileImage: '/images/bnb logo.png',
    description: 'Binance Smart Chain Network',
    socialLinks: [],
    networkConfig: {
      networkName: 'Binance Smart Chain',
      rpcUrl: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      symbol: 'BNB',
      explorerUrl: 'https://bscscan.com/',
      tokenAddress: '0x96CBE66C162Ada7F3f98E7AAF35Ffc57f222725C' // Example token address
    },
    explorerUrl: 'https://bscscan.com/',
    bridgeUrl: 'https://bridge.memextoken.org/bnb'
  }
];

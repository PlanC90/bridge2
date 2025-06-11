import { NetworkData } from '../types';

export const networks: NetworkData[] = [
  {
    id: 'electra',
    name: 'ElectraProtocol',
    profileImage: 'https://pbs.twimg.com/profile_images/1331917259191808000/E1UyOz3m_400x400.png',
    description: 'Next-generation blockchain protocol',
    socialLinks: [],
    hasMainnetInfo: true,
    explorerUrl: 'https://electraprotocol.network',
    bridgeUrl: '#'
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
      tokenAddress: '0xEE9843a40438244e90f0f92A6A3272B63348E412'
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
      tokenAddress: '0xBB95050f59ACCA5045D89E142d606C82A627aD60'
    },
    explorerUrl: 'https://shibariumscan.io',
    bridgeUrl: 'https://bridge.memextoken.org/shibarium'
  }
];

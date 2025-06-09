import { NetworkData } from '../types';

export const networks: NetworkData[] = [
  {
    id: 'electra',
    name: 'ElectraProtocol',
    profileImage: 'https://pbs.twimg.com/profile_images/1331917259191808000/E1UyOz3m_400x400.png',
    description: 'Next-generation blockchain protocol',
    socialLinks: [],
    hasMainnetInfo: true,
    explorerUrl: 'https://explorer.electraprotocol.com',
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
      tokenAddress: '0xA652446D101D145Af788672cc5dd7F8C5c87e009'
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

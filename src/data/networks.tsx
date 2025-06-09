export interface Network {
  name: string;
  chainId: string;
  rpcUrl: string;
  symbol: string;
  decimals: number;
  blockExplorer: string;
  color: string;
  hasMetaMaskSupport: boolean;
  contractAddress?: string;
}

export const networksBySymbol: Record<string, Network[]> = {
  XEP: [
    {
      name: 'XEP Network',
      chainId: '0',
      rpcUrl: 'N/A',
      symbol: 'XEP',
      decimals: 18,
      blockExplorer: 'https://electraprotocol.network/omni/property/199/',
      color: 'blue-500',
      hasMetaMaskSupport: false
    }
  ],
  BONE: [
    {
      name: 'Shibarium',
      chainId: '109',
      rpcUrl: 'https://www.shibrpc.com',
      symbol: 'BONE',
      decimals: 18,
      blockExplorer: 'https://shibarumscan.io',
      color: 'orange-500',
      hasMetaMaskSupport: true,
      contractAddress: '0xBB95050f59ACCA5045D89E142d606C82A627aD60'
    }
  ],
  OMAX: [
    {
      name: 'OMAX Network',
      chainId: '311',
      rpcUrl: 'https://mainapi.omaxray.com',
      symbol: 'OMAX',
      decimals: 18,
      blockExplorer: 'https://omaxray.com',
      color: 'green-500',
      hasMetaMaskSupport: true
    }
  ]
};

export const networks: Network[] = Object.values(networksBySymbol).flat();

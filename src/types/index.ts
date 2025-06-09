export interface NetworkConfig {
  networkName: string;
  rpcUrl: string;
  chainId: number;
  symbol: string;
  tokenAddress?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  count?: number;
}

export interface NetworkData {
  id: string;
  name: string;
  profileImage: string;
  description: string;
  socialLinks: SocialLink[];
  networkConfig?: NetworkConfig;
  explorerUrl?: string;
  bridgeUrl?: string;
  hasMainnetInfo?: boolean;
}

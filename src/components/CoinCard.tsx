import React, { useState, memo } from 'react';
import { Copy } from 'lucide-react';

interface CoinCardProps {
  coin: {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    total_volume: number;
    price_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_date: string;
    image: string;
  };
  onSelectNetwork: (network: any) => void;
}

const CoinCard: React.FC<CoinCardProps> = ({ coin, onSelectNetwork }) => {
  const {
    id,
    name,
    symbol,
    current_price,
    market_cap,
    market_cap_rank,
    total_volume,
    price_change_percentage_24h,
    circulating_supply,
    total_supply,
    max_supply,
    ath,
    ath_date,
    image,
  } = coin;

  const [copyStatus, setCopyStatus] = useState<{ [key: string]: 'idle' | 'copied' }>({});

  const handleAddNetworkToMetaMask = async (network: any) => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${parseInt(network.chainId).toString(16)}`,
            chainName: network.name,
            rpcUrls: [network.rpcUrl],
            nativeCurrency: {
              name: network.symbol,
              symbol: network.symbol,
              decimals: 18,
            },
            blockExplorerUrls: [network.blockExplorer],
          },
        ],
      });

      // Add token to MetaMask
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: network.contractAddress,
            symbol: network.symbol,
            decimals: network.decimals,
            image: image, // Use the coin image as the token image
          },
        },
      });
    } catch (error: any) {
      console.error("Failed to add network to MetaMask:", error);
      alert(`Failed to add ${network.name} to MetaMask: ${error.message}`);
    }
  };

  const getNetworksForCoin = () => {
    switch (id) {
      case 'omax':
        return [{
          name: 'OMAX Network',
          chainId: '311',
          rpcUrl: 'https://mainapi.omaxray.com',
          symbol: 'OMAX',
          decimals: 18,
          blockExplorer: 'https://omaxray.com',
          color: 'green-500',
          hasMetaMaskSupport: true,
          contractAddress: '0xA652446D101D145Af788672cc5dd7F8C5c87e009'
        }];
      case 'bone':
        return [{
          name: 'Shibarium',
          chainId: '109',
          rpcUrl: 'https://www.shibrpc.com',
          symbol: 'BONE',
          decimals: 18,
          blockExplorer: 'https://shibariumscan.io',
          color: 'orange-500',
          hasMetaMaskSupport: true,
          contractAddress: '0xBB95050f59ACCA5045D89E142d606C82A627aD60'
        }];
      case 'xep':
        return [{
          name: 'Electra Protocol',
          chainId: '223',
          rpcUrl: 'https://mainnet.electraprotocol.com',
          symbol: 'XEP',
          decimals: 2,
          blockExplorer: 'https://explorer.electraprotocol.com/',
          color: 'gray-500',
          hasMetaMaskSupport: true,
          contractAddress: 'fa005b6cd335f016a5df18fd56cf2baa27352402ad6d3c023d59958de2a8483a'
        }];
      default:
        return [];
    }
  };

  const relevantNetworks = getNetworksForCoin();

  const handleCopyClick = (address: string, coinId: string) => {
    navigator.clipboard.writeText(address)
      .then(() => {
        setCopyStatus(prevState => ({
          ...prevState,
          [coinId]: 'copied',
        }));
        setTimeout(() => {
          setCopyStatus(prevState => ({
            ...prevState,
            [coinId]: 'idle',
          }));
        }, 2000);
      })
      .catch(err => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy contract address.");
      });
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden relative border border-white/10">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img src={image} alt={name} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="text-lg font-semibold text-white">{name}</h3>
              <p className="text-white/70 text-sm">{symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">${current_price.toFixed(4)}</p>
            <p className={`text-sm ${price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 text-white/80 text-sm">
          <div>
            <p>Market Cap Rank: <span className="font-semibold">{market_cap_rank}</span></p>
            <p>Market Cap: <span className="font-semibold">${(market_cap / 1000000).toFixed(2)}M</span></p>
            <p>Total Volume: <span className="font-semibold">${(total_volume / 1000000).toFixed(2)}M</span></p>
          </div>
          <div>
            <p>Circulating Supply: <span className="font-semibold">{circulating_supply.toLocaleString()}</span></p>
            {total_supply && <p>Total Supply: <span className="font-semibold">{total_supply.toLocaleString()}</span></p>}
            {max_supply && <p>Max Supply: <span className="font-semibold">{max_supply.toLocaleString()}</span></p>}
          </div>
          <div>
            <p>ATH: <span className="font-semibold">${ath}</span></p>
            <p>ATH Date: <span className="font-semibold">{new Date(ath_date).toLocaleDateString()}</span></p>
          </div>
        </div>

        {id === 'bone' && (
          <>
            <div className="mb-4 flex items-center">
              <p className="text-white/70 text-sm mr-2">
                Contract Address: <code className="font-mono text-white/90">{relevantNetworks[0].contractAddress}</code>
              </p>
              <button
                onClick={() => handleCopyClick(relevantNetworks[0].contractAddress, 'bone')}
                className="bg-white/10 hover:bg-white/20 rounded p-1 transition-colors"
              >
                {copyStatus['bone'] === 'copied' ? 'Copied!' : <Copy className="w-4 h-4 text-white" />}
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  const network = relevantNetworks[0];
                  if (network) {
                    handleAddNetworkToMetaMask(network);
                  }
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors block text-center w-full"
              >
                <img src="https://pbs.twimg.com/profile_images/1895186503443316736/EaIM9RTY_400x400.jpg" alt="MetaMask" className="w-6 h-6 inline-block mr-2 align-middle" style={{ width: '24px', height: '24px' }} />
                Add Shibarium to MetaMask
              </button>
            </div>
            <div className="mt-2">
              <a
                href="https://bridge.memextoken.org/shibarium/"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors block text-center w-full"
              >
                Bridge SHIBARIUM
              </a>
            </div>
          </>
        )}

        {id === 'omax' && (
          <>
            <div className="mb-4 flex items-center">
              <p className="text-white/70 text-sm mr-2">
                Contract Address: <code className="font-mono text-white/90">{relevantNetworks[0].contractAddress}</code>
              </p>
              <button
                onClick={() => handleCopyClick(relevantNetworks[0].contractAddress, 'omax')}
                className="bg-white/10 hover:bg-white/20 rounded p-1 transition-colors"
              >
                {copyStatus['omax'] === 'copied' ? 'Copied!' : <Copy className="w-4 h-4 text-white" />}
              </button>
            </div>
            <div className="mt-4">
              <button
                onClick={() => {
                  const network = relevantNetworks[0];
                  if (network) {
                    handleAddNetworkToMetaMask(network);
                  }
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors block text-center w-full"
              >
                <img src="https://pbs.twimg.com/profile_images/1895186503443316736/EaIM9RTY_400x400.jpg" alt="MetaMask" className="w-6 h-6 inline-block mr-2 align-middle" style={{ width: '24px', height: '24px' }} />
                Add OMAX Network to MetaMask
              </button>
            </div>
            <div className="mt-2">
              <a
                href="https://bridge.memextoken.org/omax/"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors block text-center w-full"
              >
                Bridge OMAX
              </a>
            </div>
          </>
        )}

        {id === 'xep' && (
          <>
            <div className="mb-4 flex items-center">
              <p className="text-white/70 text-sm mr-2">
                Contract Address: <code className="font-mono text-white/90">{relevantNetworks[0].contractAddress}</code>
              </p>
              <button
                onClick={() => handleCopyClick(relevantNetworks[0].contractAddress, 'xep')}
                className="bg-white/10 hover:bg-white/20 rounded p-1 transition-colors"
              >
                {copyStatus['xep'] === 'copied' ? 'Copied!' : <Copy className="w-4 h-4 text-white" />}
              </button>
            </div>
            <div className="mt-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors block text-center w-full"
              >
                Main Network
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(CoinCard);

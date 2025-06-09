import React from 'react';
import { X, ExternalLink, Copy, CheckCircle } from 'lucide-react';

interface Network {
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

interface NetworkModalProps {
  network: Network | null;
  isOpen: boolean;
  onClose: () => void;
}

const NetworkModal: React.FC<NetworkModalProps> = ({ network, isOpen, onClose }) => {
  if (!isOpen || !network || !network.hasMetaMaskSupport) return null;

  const addToMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${parseInt(network.chainId).toString(16)}`,
            chainName: network.name,
            nativeCurrency: {
              name: network.symbol,
              symbol: network.symbol,
              decimals: network.decimals,
            },
            rpcUrls: [network.rpcUrl],
            blockExplorerUrls: [network.blockExplorer],
          }],
        });

        // Add token to MetaMask if contract address exists
        if (network.contractAddress) {
          await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: network.contractAddress,
                symbol: network.symbol,
                decimals: network.decimals,
              },
            },
          });
        }

        // Show success message
        alert(`${network.name} has been successfully added to MetaMask!`);
        onClose();
      } catch (error: any) {
        console.error('Error adding network to MetaMask:', error);
        alert(`Failed to add ${network.name} to MetaMask: ${error.message}`);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to continue.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full border border-white/20 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">{network.name} Network Info</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70">Network Name</span>
              <button
                onClick={() => copyToClipboard(network.name)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
            <p className="text-white font-mono text-sm break-all">{network.name}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70">Chain ID</span>
              <button
                onClick={() => copyToClipboard(network.chainId)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
            <p className="text-white font-mono text-sm">{network.chainId}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70">RPC URL</span>
              <button
                onClick={() => copyToClipboard(network.rpcUrl)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
            <p className="text-white font-mono text-sm break-all">{network.rpcUrl}</p>
          </div>

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70">Currency</span>
              <button
                onClick={() => copyToClipboard(network.symbol)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <Copy size={16} />
              </button>
            </div>
            <p className="text-white font-mono text-sm">{network.symbol}</p>
          </div>

          {network.contractAddress && (
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70">Contract Address</span>
                <button
                  onClick={() => copyToClipboard(network.contractAddress!)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-white font-mono text-sm break-all">{network.contractAddress}</p>
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/70">Block Explorer</span>
              <a
                href={network.blockExplorer}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <p className="text-white font-mono text-sm break-all">{network.blockExplorer}</p>
          </div>
        </div>

        <button
          onClick={addToMetaMask}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <CheckCircle size={20} />
          Add to MetaMask
        </button>
      </div>
    </div>
  );
};

export default NetworkModal;

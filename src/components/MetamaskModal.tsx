import React from 'react';
import { X, Wallet, Copy, Check } from 'lucide-react';
import { NetworkConfig } from '../types';

interface MetamaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  networkConfig: NetworkConfig;
  networkName: string;
}

export const MetamaskModal: React.FC<MetamaskModalProps> = ({
  isOpen,
  onClose,
  networkConfig,
  networkName
}) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const addToMetamask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${networkConfig.chainId.toString(16)}`,
            chainName: networkConfig.networkName,
            rpcUrls: [networkConfig.rpcUrl],
            nativeCurrency: {
              name: networkConfig.symbol,
              symbol: networkConfig.symbol,
              decimals: 18
            }
          }]
        });
        onClose();
      } else {
        alert('MetaMask is not installed. Please install MetaMask to add this network.');
      }
    } catch (error) {
      console.error('Error adding network to MetaMask:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add to MetaMask</h2>
                <p className="text-sm text-gray-500">{networkName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Network Name</span>
                <button
                  onClick={() => copyToClipboard(networkConfig.networkName, 'networkName')}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {copiedField === 'networkName' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-900 font-mono">{networkConfig.networkName}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">RPC URL</span>
                <button
                  onClick={() => copyToClipboard(networkConfig.rpcUrl, 'rpcUrl')}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {copiedField === 'rpcUrl' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-900 font-mono break-all">{networkConfig.rpcUrl}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Chain ID</span>
                <button
                  onClick={() => copyToClipboard(networkConfig.chainId.toString(), 'chainId')}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {copiedField === 'chainId' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-900 font-mono">{networkConfig.chainId}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Symbol</span>
                <button
                  onClick={() => copyToClipboard(networkConfig.symbol, 'symbol')}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  {copiedField === 'symbol' ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-900 font-mono">{networkConfig.symbol}</p>
            </div>

            {networkConfig.tokenAddress && (
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Token Contract</span>
                  <button
                    onClick={() => copyToClipboard(networkConfig.tokenAddress!, 'tokenAddress')}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    {copiedField === 'tokenAddress' ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-900 font-mono break-all">{networkConfig.tokenAddress}</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={addToMetamask}
              className="flex-1 px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition-colors"
            >
              Add Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

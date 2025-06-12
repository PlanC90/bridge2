import React from 'react';
import { X, Copy } from 'lucide-react';
import { NetworkConfig } from '../types';

interface MetamaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  networkConfig: NetworkConfig;
  networkName: string;
}

export const MetamaskModal: React.FC<MetamaskModalProps> = ({ isOpen, onClose, networkConfig, networkName }) => {
  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    alert(`${fieldName} copied to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add to MetaMask</h2>
          <p className="text-gray-600 mb-6">
            You are about to add <strong className="font-semibold">{networkName}</strong> to your MetaMask wallet.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Network Name
              </label>
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                <input
                  type="text"
                  className="bg-transparent w-full text-gray-700 focus:outline-none"
                  value={networkConfig.networkName}
                  readOnly
                />
                <button
                  onClick={() => handleCopy(networkConfig.networkName, 'Network Name')}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                RPC URL
              </label>
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                <input
                  type="text"
                  className="bg-transparent w-full text-gray-700 focus:outline-none"
                  value={networkConfig.rpcUrl}
                  readOnly
                />
                <button
                  onClick={() => handleCopy(networkConfig.rpcUrl, 'RPC URL')}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Chain ID
              </label>
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                <input
                  type="text"
                  className="bg-transparent w-full text-gray-700 focus:outline-none"
                  value={String(networkConfig.chainId)}
                  readOnly
                />
                <button
                  onClick={() => handleCopy(String(networkConfig.chainId), 'Chain ID')}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Symbol
              </label>
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                <input
                  type="text"
                  className="bg-transparent w-full text-gray-700 focus:outline-none"
                  value={networkConfig.symbol}
                  readOnly
                />
                <button
                  onClick={() => handleCopy(networkConfig.symbol, 'Symbol')}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

						{networkConfig.tokenAddress && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Token Contract
                </label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <input
                    type="text"
                    className="bg-transparent w-full text-gray-700 focus:outline-none"
                    value={networkConfig.tokenAddress}
                    readOnly
                  />
                  <button
                    onClick={() => handleCopy(networkConfig.tokenAddress, 'Token Contract')}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

						{networkConfig.explorerUrl && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Explorer URL
                </label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <input
                    type="text"
                    className="bg-transparent w-full text-gray-700 focus:outline-none"
                    value={networkConfig.explorerUrl}
                    readOnly
                  />
                  <button
                    onClick={() => handleCopy(networkConfig.explorerUrl, 'Explorer URL')}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Network
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

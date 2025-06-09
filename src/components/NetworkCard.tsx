import React, { useState } from 'react';
import { Plus, ExternalLink, Grid as Bridge, Info, Wallet } from 'lucide-react';
import { NetworkData } from '../types';
import { SocialLinks } from './SocialLinks';
import { MetamaskModal } from './MetamaskModal';

interface NetworkCardProps {
  network: NetworkData;
}

export const NetworkCard: React.FC<NetworkCardProps> = ({ network }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCardGradient = (id: string) => {
    switch (id) {
      case 'electra':
        return 'from-purple-400 via-pink-500 to-red-500';
      case 'omax':
        return 'from-blue-400 via-purple-500 to-pink-500';
      case 'shibarium':
        return 'from-orange-400 via-red-500 to-pink-500';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <>
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getCardGradient(network.id)} p-1 shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl`}>
        <div className="relative bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col">
          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img
                src={network.profileImage}
                alt={network.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white border-opacity-50"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{network.name}</h3>
              <p className="text-white text-opacity-80 text-sm">{network.description}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-6">
            <SocialLinks links={network.socialLinks} />
          </div>

          {/* Action Buttons - Using flex-grow to push buttons to bottom and align them */}
          <div className="flex-grow flex flex-col justify-end">
            <div className="space-y-3">
              {network.hasMainnetInfo && (
                <button className="w-full flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg">
                  <Info className="w-5 h-5" />
                  Mainnet Info
                </button>
              )}

              {network.networkConfig && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                >
                  <Wallet className="w-5 h-5" />
                  Add to MetaMask
                </button>
              )}

              <div className="grid grid-cols-2 gap-3">
                {network.explorerUrl && (
                  <a
                    href={network.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Explorer
                  </a>
                )}

                {network.bridgeUrl && (
                  <a
                    href={network.bridgeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:shadow-lg"
                  >
                    <Bridge className="w-4 h-4" />
                    Bridge
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {network.networkConfig && (
        <MetamaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          networkConfig={network.networkConfig}
          networkName={network.name}
        />
      )}
    </>
  );
};

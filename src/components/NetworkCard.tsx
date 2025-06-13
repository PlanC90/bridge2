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

  // Removed gradient logic as card background is now transparent/blurred
  // const getCardGradient = (id: string) => {
  //   switch (id) {
  //     case 'electra':
  //       return 'from-purple-200 to-pink-300';
  //     case 'omax':
  //       return 'from-blue-200 to-purple-300';
  //     case 'shibarium':
  //       return 'from-orange-200 to-red-300';
  //     case 'areon':
  //       return 'from-purple-200 to-pink-300'; // Use the same gradient as Electra
  //     default:
  //       return 'from-gray-200 to-gray-300';
  //   }
  // };

  return (
    <>
      {/* Card Container with subtle border and shadow */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm p-px shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl border border-white/10 transform-gpu">
        {/* Inner Content */}
        <div className="relative bg-white/5 rounded-2xl p-8 h-full flex flex-col">
          {/* Profile Section */}
          <div className="flex items-center gap-5 mb-8">
            <div className="relative">
              <img
                src={network.profileImage}
                alt={network.name}
                className="w-24 h-24 rounded-full object-cover border-2 border-white/30 shadow-sm"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-1">{network.name}</h3>
              <p className="text-white/70 text-sm">{network.description}</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="mb-8">
            <SocialLinks links={network.socialLinks} />
          </div>

          {/* Action Buttons - Using flex-grow to push buttons to bottom and align them */}
          <div className="flex-grow flex flex-col justify-end">
            <div className="space-y-4">
              {network.hasMainnetInfo && (
                <button className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-sm border border-white/20">
                  <Info className="w-5 h-5" />
                  Mainnet Info
                </button>
              )}

              {network.networkConfig && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-md"
                >
                  <Wallet className="w-5 h-5" />
                  Add to MetaMask
                </button>
              )}

              <div className="grid grid-cols-2 gap-4">
                {network.explorerUrl && (
                  <a
                    href={network.explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-sm border border-white/20"
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
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 shadow-sm border border-white/20"
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

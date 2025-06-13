import React from 'react';
import { NetworkCard } from './components/NetworkCard';
import { networks } from './data/networks';
import { Wallet, Zap } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          {/* Added Logo */}
          <img 
            src="https://pbs.twimg.com/profile_images/1862867193412591616/4qGwnjJC_400x400.jpg" 
            alt="MemeX Logo" 
            className="mx-auto mb-6 w-36 h-36 rounded-full shadow-xl" // Increased size from w-24 h-24 to w-36 h-36
          />
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
              <Zap className="w-10 h-10 text-yellow-400" />
            </div>
            <h1 className="text-5xl font-extrabold text-white leading-tight">
              MemeX Blockchain
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> Networks</span>
            </h1>
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
              <Wallet className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Connect to the future of decentralized finance. Add networks to MetaMask, explore blockchains, and access cross-chain bridges.
          </p>
        </div>

        {/* Network Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {networks.map((network) => (
            <NetworkCard key={network.id} network={network} />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-20 pt-10 border-t border-white/20">
          <p className="text-white/60 text-lg">
            Built with ❤️ for the decentralized future
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

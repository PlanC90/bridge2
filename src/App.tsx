import React, { useState, useCallback, useMemo } from 'react';
import { Grid as Bridge, RefreshCw, Zap, TrendingUp } from 'lucide-react';
import CoinCard from './components/CoinCard';
import NetworkModal from './components/NetworkModal';
import LoadingSpinner from './components/LoadingSpinner';
import BlockExplorers from './components/BlockExplorers';
import useCoinData from './hooks/useCoinData';

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

function App() {
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { coins, loading, error, refetch } = useCoinData();

  const handleNetworkSelect = (network: Network) => {
    if (network.hasMetaMaskSupport) {
      setSelectedNetwork(network);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNetwork(null);
  };

  const logoUrl = "https://apricot-rational-booby-281.mypinata.cloud/ipfs/bafybeighc2hfv6ra5prrs55255sweuc2ghgvil577wki6seab7b2gelx4a";

  const MemoizedCoinCard = useMemo(() => {
    return CoinCard;
  }, []);

  const renderCoinCards = useCallback(() => {
    return coins.map((coin) => (
      <MemoizedCoinCard
        key={coin.id}
        coin={coin}
        onSelectNetwork={handleNetworkSelect}
      />
    ));
  }, [coins, handleNetworkSelect, MemoizedCoinCard]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero background image */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop")'
        }}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="text-center py-12 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={logoUrl} alt="MemeX Bridge Logo" className="w-12 h-12 rounded-full" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              MemeX Bridge
            </h1>
          </div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Securely and quickly bridge your XEP, BONE, and OMAX tokens between different networks. 
            Choose the best network with real-time price information.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white/90 text-sm">Real-time Data</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-white/90 text-sm">24h Change</span>
            </div>
            <button
              onClick={refetch}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 text-blue-400" />
              <span className="text-white/90 text-sm">Refresh</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 pb-12">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-400 font-semibold mb-4">{error}</p>
                <button
                  onClick={refetch}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {renderCoinCards()}
            </div>
          )}
        </main>

        {/* MetaMask Explanation Section */}
        <section className="container mx-auto px-1 py-1">
          <div className="text-center mb-8">
            <img
              src="https://apricot-rational-booby-281.mypinata.cloud/ipfs/bafkreigobu3fnbmt46xglyjg23uftlcvejpgewe4vh5ov4pez2yvozyinq"
              alt="MetaMask Logo"
              className="w-68 h-48 mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-white mb-4">What is MetaMask?</h2>
            <div className="flex items-center justify-center mb-4">
              <p className="text-white/70 max-w-3xl">
                MetaMask is a popular cryptocurrency wallet used to interact with the Ethereum blockchain and other EVM-compatible networks. It allows users to manage their digital assets, access decentralized applications (dApps), and securely conduct transactions.
              </p>
            </div>
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Download MetaMask
            </a>
          </div>
        </section>

        {/* Block Explorers Section */}
        <BlockExplorers />

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-white/10">
          <p className="text-white/60">
            © 2025 MemeX Bridge. All rights reserved. XEP, BONE and OMAX network information.
          </p>
        </footer>
      </div>

      {/* Network Modal */}
      <NetworkModal
        network={selectedNetwork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default App;

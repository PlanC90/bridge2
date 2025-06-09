import React from 'react';
import { ExternalLink, Search, Globe } from 'lucide-react';

const BlockExplorers: React.FC = () => {
  const explorers = [
    {
      name: 'XEP Network Explorer',
      url: 'https://electraprotocol.network/omni/property/199/',
      description: 'Official XEP blockchain explorer',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Shibarium Explorer',
      url: 'https://www.shibariumscan.io/',
      description: 'BONE token transactions on Shibarium',
      icon: <Search className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'OMAX Explorer',
      url: 'https://omaxray.com',
      description: 'OMAX network blockchain explorer',
      icon: <ExternalLink className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Block Explorers</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Explore transactions, addresses, and network statistics on official blockchain explorers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {explorers.map((explorer, index) => (
          <a
            key={index}
            href={explorer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105"
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${explorer.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {explorer.icon}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
              {explorer.name}
            </h3>
            
            <p className="text-white/70 text-sm mb-4">
              {explorer.description}
            </p>
            
            <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
              <span className="text-sm font-medium">Visit Explorer</span>
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlockExplorers;

import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, X } from 'lucide-react';

interface BridgeTransaction {
  id: string;
  walletAddress: string;
  amount: number;
  network: string;
  avatar: string;
  timestamp: number;
}

interface BridgeNotificationsProps {
  hideWhenPopupOpen?: boolean;
}

const BridgeNotifications: React.FC<BridgeNotificationsProps> = ({ hideWhenPopupOpen = false }) => {
  const [activeNotifications, setActiveNotifications] = useState<BridgeTransaction[]>([]);

  // Gerçek EVM cüzdan adresleri
  const mockTransactions: Omit<BridgeTransaction, 'id' | 'timestamp'>[] = [
    // Existing wallets
    { walletAddress: '0x891A...F284', amount: 134.5, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x56ed...8b17', amount: 267.3, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x9696...6976', amount: 45.8, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x4d9f...5e2b', amount: 203.4, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x4976...2327', amount: 89.7, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xd88b...49b3', amount: 156.2, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x7dfe...f46e', amount: 78.9, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x345d...90f2', amount: 234.1, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xc3c8...1d9e', amount: 67.4, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x2e58...dd3d', amount: 189.6, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x4459...ebbf', amount: 123.8, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xa344...49f3', amount: 298.5, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x5a52...efcb', amount: 56.7, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x06a0...d42d', amount: 167.3, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x892e...8ebe', amount: 245.9, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x0079...079c', amount: 112.4, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x141f...1c48', amount: 78.2, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x50d6...45ce', amount: 189.7, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x2f7e...1b28', amount: 134.6, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xd9d9...d7d7', amount: 267.1, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    
    // New wallets
    { walletAddress: '0xef7a...fec3', amount: 156.8, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x5631...c1db', amount: 89.3, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x4785...47a3', amount: 234.7, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x25ee...498a', amount: 67.9, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xe1e5...0be7', amount: 178.4, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x8f3a...1630', amount: 123.6, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x01e4...a013', amount: 298.2, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xcc6f...7024', amount: 45.7, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xb8d4...dbd6', amount: 189.5, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x1e22...ff67', amount: 267.8, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xaa06...1f72', amount: 78.1, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x5e6a...d1a', amount: 134.9, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xdfcf...5e3a', amount: 245.3, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x679f...615a', amount: 89.6, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x0323...6c74', amount: 167.4, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x3440...1d02', amount: 123.7, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xdc28...9cff', amount: 298.1, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x794c...38a5', amount: 56.8, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x9e3e...b5f0', amount: 189.2, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x094b...3160', amount: 234.6, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xa339...e22', amount: 78.4, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xe94d...cb95', amount: 167.9, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xe48c...c38e', amount: 123.5, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x6298...c43d', amount: 289.7, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x910c...cf8a', amount: 45.9, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xffd0...194b', amount: 178.3, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x0f69...9ed3c', amount: 234.8, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xcc5f...5167', amount: 89.1, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x6329...6395', amount: 267.4, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x74de...f9a1', amount: 134.2, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x7071...1ba8', amount: 67.6, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xf326...5ea06', amount: 189.8, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xf197...16bc9', amount: 123.4, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xb10e...f13', amount: 298.6, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xb8cb...27ac', amount: 78.7, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x8cfa...a5d9', amount: 167.2, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x3da4...5b2', amount: 245.1, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xd123...216f', amount: 89.8, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x2e51...77b6', amount: 134.3, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x3698...4384', amount: 267.7, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x37b6...ed51', amount: 56.4, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x38f7...0867', amount: 178.9, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x4d24...2fcb', amount: 123.1, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x260e...1093', amount: 289.4, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x2f1f...77cc', amount: 67.8, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x683b...fb44', amount: 234.5, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x9385...6194', amount: 89.2, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xd234...25c3a3', amount: 167.6, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xf509...3796', amount: 245.8, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xc582...43e2', amount: 134.7, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x8281...db55', amount: 78.3, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xc8f1...6bffb', amount: 189.1, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xad2e...8beb', amount: 267.2, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x3bf5...fa95', amount: 123.9, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xd276...74f3', amount: 56.1, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xd894...3a01', amount: 298.3, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x8fa7...564c', amount: 89.5, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x7c67...d327', amount: 178.7, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xcfbb...4a19e', amount: 134.8, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xaf64...afc5b', amount: 267.5, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x0349...b3e825', amount: 78.6, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xa205...3e825', amount: 234.2, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xa599...649be', amount: 123.3, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xad79...1f54', amount: 189.6, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xa5ef...df7e', amount: 267.9, network: 'OMAX Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0xe0d7...e045', amount: 89.4, network: 'BNB Chain', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x7fa9...debb', amount: 156.5, network: 'Areon Network', avatar: 'https://i.imgur.com/xCRgs25.png' },
    { walletAddress: '0x1a34...ca2c', amount: 234.9, network: 'Shibarium', avatar: 'https://i.imgur.com/xCRgs25.png' }
  ];

  const formatWalletAddress = (address: string) => {
    return address;
  };

  const formatAmount = (amount: number, network: string) => {
    if (network === 'OMAX Network') {
      return `${amount.toFixed(1)}M oMemeX`;
    } else if (network === 'Areon Network') {
      return `${amount.toFixed(1)}M aMemeX`;
    } else if (network === 'BNB Chain') {
      return `${amount.toFixed(1)}M bMemeX`;
    } else if (network === 'Shibarium') {
      return `${amount.toFixed(1)}M MemeX`;
    }
    return `${amount.toFixed(1)}M MemeX`;
  };

  const removeNotification = (id: string) => {
    setActiveNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  useEffect(() => {
    const addRandomNotification = () => {
      const randomTransaction = mockTransactions[Math.floor(Math.random() * mockTransactions.length)];
      const newNotification: BridgeTransaction = {
        ...randomTransaction,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now()
      };

      setActiveNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, 3); // Maksimum 3 notification
        return updated;
      });

      // 5 saniye sonra otomatik kaldır
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, 5000);
    };

    // İlk notification'ı hemen ekle
    addRandomNotification();

    // Her 3 saniyede bir yeni notification ekle
    const interval = setInterval(() => {
      addRandomNotification();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Popup açıkken bildirimleri gizle
  if (hideWhenPopupOpen) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-xs sm:max-w-sm">
      {activeNotifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl transform transition-all duration-500 ease-out animate-slide-in-right"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <ArrowRightLeft className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              
              <span className="text-white font-semibold text-xs sm:text-sm">Swap Transaction</span>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-white/60 hover:text-white transition-colors p-1"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={notification.avatar}
              alt="User Avatar"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-white/30 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-white/90 text-xs sm:text-sm font-medium mb-1 truncate">
                {formatWalletAddress(notification.walletAddress)}
              </div>
              <div className="text-white/70 text-xs mb-1">
                via {notification.network}
              </div>
              <div className="text-green-400 font-semibold text-xs sm:text-sm">
                {formatAmount(notification.amount, notification.network)}
              </div>
            </div>
          </div>

          <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs text-white/60">
              <span>Swap completed</span>
              <span>Just now</span>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BridgeNotifications;

import React from 'react';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface BridgeClosedPageProps {
  network: 'omax' | 'areon';
}

const BridgeClosedPage: React.FC<BridgeClosedPageProps> = ({ network }) => {
  const networkData = {
    omax: {
      name: 'OMAX',
      logo: '/images/omax-logo.png',
      title: 'Bridge Unavailable',
      content: 'The bridge service for the OMAX network has been permanently closed as the allocated token supply has been fully bridged.\n\nWe sincerely thank you for your support and interest.\n\nPlease follow our official channels for future updates.',
      color: 'from-green-500 to-emerald-600'
    },
    areon: {
      name: 'AREON',
      logo: '/images/areon-logo.png',
      title: 'Bridge Unavailable',
      content: 'The bridge service for the AREON network has been permanently closed due to full allocation usage.\n\nWe truly appreciate your support and engagement.\n\nPlease stay connected for any future developments.',
      color: 'from-purple-500 to-indigo-600'
    }
  };

  const data = networkData[network];

  const handleGoBack = () => {
    window.history.back();
  };

  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full">
          {/* Back Button */}
          <button
            onClick={handleGoBack}
            className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Networks</span>
          </button>

          {/* Main Content Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl text-center">
            {/* Network Logo */}
            <div className="mb-8">
              <img
                src={data.logo}
                alt={`${data.name} Logo`}
                className="w-24 h-24 mx-auto rounded-full shadow-xl border-4 border-white/20"
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>

            {/* Alert Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500/30">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              {data.title}
            </h1>

            {/* Network Name Badge */}
            <div className={`inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r ${data.color} text-white font-semibold text-lg mb-8 shadow-lg`}>
              {data.name} Network
            </div>

            {/* Content */}
            <div className="text-white/90 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              {formatContent(data.content)}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGoBack}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 border border-white/20 hover:border-white/30"
              >
                Return to Dashboard
              </button>
              
              <a
                href="https://x.com/memexairdrop"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg"
              >
                Follow Updates
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Thank you for being part of the MemeX ecosystem
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BridgeClosedPage;

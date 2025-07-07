import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Globe, Loader, ShoppingCart } from 'lucide-react';

interface BnbBridgeTutorialStep {
  id: number;
  title: {
    en: string;
    tr: string;
    zh: string;
  };
  description: {
    en: string;
    tr: string;
    zh: string;
  };
  image: string;
}

interface BnbBridgeTutorialPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type Language = 'en' | 'tr' | 'zh';

const BnbBridgeTutorialPopup: React.FC<BnbBridgeTutorialPopupProps> = ({ 
  isOpen, 
  onClose, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [imageLoading, setImageLoading] = useState<{ [key: number]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  // Pop-up açıldığında her zaman 1. sayfadan başla
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setTermsAccepted(false);
    }
  }, [isOpen]);

  const translations = {
    en: {
      bridgeTutorial: 'Bridge Tutorial',
      progress: 'Progress',
      previous: 'Previous',
      prev: 'Prev',
      next: 'Next',
      bridge: 'Bridge',
      goToBridge: 'Go to Bridge',
      buyBmemex: 'Buy bMEMEX',
      termsText: 'I understand the risks involved in cross-chain bridging and agree to the',
      termsOfService: 'Terms of Service',
      and: 'and',
      privacyPolicy: 'Privacy Policy',
      imageLoading: 'Loading image...'
    },
    tr: {
      bridgeTutorial: 'Bridge Eğitimi',
      progress: 'İlerleme',
      previous: 'Önceki',
      prev: 'Önc',
      next: 'Sonraki',
      bridge: 'Bridge',
      goToBridge: 'Bridge\'e Git',
      buyBmemex: 'bMEMEX Satın Al',
      termsText: 'Zincirler arası köprüleme risklerini anlıyorum ve',
      termsOfService: 'Hizmet Şartları',
      and: 've',
      privacyPolicy: 'Gizlilik Politikası',
      imageLoading: 'Görsel yükleniyor...'
    },
    zh: {
      bridgeTutorial: '跨链桥教程',
      progress: '进度',
      previous: '上一步',
      prev: '上一步',
      next: '下一步',
      bridge: '跨链桥',
      goToBridge: '前往跨链桥',
      buyBmemex: '购买 bMEMEX',
      termsText: '我了解跨链桥接的风险并同意',
      termsOfService: '服务条款',
      and: '和',
      privacyPolicy: '隐私政策',
      imageLoading: '图片加载中...'
    }
  };

  const steps: BnbBridgeTutorialStep[] = [
    {
      id: 1,
      title: {
        en: "Bridge Your MEMEX Tokens",
        tr: "MEMEX Token'larınızı Köprüleyin",
        zh: "桥接您的MEMEX代币"
      },
      description: {
        en: "You can now bridge your MEMEX tokens to the Binance Smart Chain (BSC) network.\n\nEnjoy low fees and high-speed transactions with BNB Chain's vast ecosystem.\n\nThis bridge allows you to convert MEMEX into BMEMEX tokens for enhanced utility.\n\n🎯 Bridge now and experience the power of BSC.",
        tr: "Artık MEMEX token'larınızı Binance Smart Chain (BSC) ağına köprüleyebilirsiniz.\n\nBNB Chain'in geniş ekosistemi ile düşük ücretler ve yüksek hızlı işlemlerin keyfini çıkarın.\n\nBu köprü, MEMEX'i gelişmiş fayda için BMEMEX token'larına dönüştürmenize olanak tanır.\n\n🎯 Şimdi köprüleyin ve BSC'nin gücünü deneyimleyin.",
        zh: "您现在可以将MEMEX代币桥接到币安智能链(BSC)网络。\n\n享受BNB链庞大生态系统的低费用和高速交易。\n\n这个桥接允许您将MEMEX转换为BMEMEX代币以增强实用性。\n\n🎯 立即桥接，体验BSC的力量。"
      },
      image: "/images/bnb bridge.png"
    },
    {
      id: 2,
      title: {
        en: "Your Choice, Your Future",
        tr: "Seçiminiz, Geleceğiniz",
        zh: "您的选择，您的未来"
      },
      description: {
        en: "Bridging to BNB is optional. You can choose to bridge your MEMEX tokens to BSC as BMEMEX or wait for future updates on the XEP chain.\n\nIf you'd like to start now, click the button below to access the bridge.\n\nThis will redirect to the BNB bridge interface.\n\n🚀 Early adopters gain the advantage. The choice is yours.",
        tr: "BNB'ye köprüleme isteğe bağlıdır. MEMEX token'larınızı BSC'ye BMEMEX olarak köprülemeyi seçebilir veya XEP zincirindeki gelecek güncellemeleri bekleyebilirsiniz.\n\nHemen başlamak istiyorsanız, köprüye erişmek için aşağıdaki düğmeye tıklayın.\n\nBu sizi BNB köprü arayüzüne yönlendirecek.\n\n🚀 Erken benimseyen avantaj kazanır. Seçim sizin.",
        zh: "桥接到BNB是可选的。您可以选择将MEMEX代币作为BMEMEX桥接到BSC，或等待XEP链上的未来更新。\n\n如果您想现在开始，请点击下面的按钮访问桥接。\n\n这将重定向到BNB桥接界面。\n\n🚀 早期采用者获得优势。选择权在您。"
      },
      image: "/images/bnb swap.png"
    }
  ];

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const t = translations[language];
  const currentStepData = steps[currentStep];

  // Preload images when component mounts
  useEffect(() => {
    if (isOpen) {
      steps.forEach((step, index) => {
        const img = new Image();
        setImageLoading(prev => ({ ...prev, [index]: true }));
        
        img.onload = () => {
          setImageLoading(prev => ({ ...prev, [index]: false }));
        };
        
        img.onerror = () => {
          setImageLoading(prev => ({ ...prev, [index]: false }));
          setImageErrors(prev => ({ ...prev, [index]: true }));
        };
        
        img.src = step.image;
      });
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (termsAccepted) {
      onComplete();
      onClose();
    }
  };

  const handleBuyBmemex = () => {
    window.open('https://app.uniswap.org/swap?chain=bnb&inputCurrency=NATIVE&outputCurrency=0xb04169bd381e2580e562bdf17af5f74b5d529c0b&value=1&field=input', '_blank');
  };

  const formatDescription = (text: string) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl w-full max-w-xs sm:max-w-md lg:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/20 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">{currentStep + 1}</span>
            </div>
            <h2 className="text-sm sm:text-lg font-bold text-white">{t.bridgeTutorial}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="appearance-none bg-white/10 border border-white/20 rounded-md px-2 py-1 text-white text-xs focus:outline-none focus:ring-1 focus:ring-yellow-500 cursor-pointer"
              >
                <option value="en" className="bg-gray-800 text-white">🇺🇸 EN</option>
                <option value="tr" className="bg-gray-800 text-white">🇹🇷 TR</option>
                <option value="zh" className="bg-gray-800 text-white">🇨🇳 中文</option>
              </select>
              <Globe className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60 pointer-events-none" />
            </div>
            
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-3 sm:px-4 py-2 flex-shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white/70 text-xs">{t.progress}</span>
            <span className="text-white font-semibold text-xs">
              {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4">
          {/* Image Container with Loading State */}
          <div className="mb-6 rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-lg relative">
            {imageLoading[currentStep] && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-2">
                  <Loader className="w-8 h-8 text-yellow-400 animate-spin" />
                  <span className="text-white/70 text-xs">{t.imageLoading}</span>
                </div>
              </div>
            )}
            
            {imageErrors[currentStep] ? (
              <div className="w-full h-64 sm:h-72 lg:h-80 flex items-center justify-center bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <X className="w-8 h-8 text-white/60" />
                  </div>
                  <p className="text-white/60 text-sm">Image unavailable</p>
                </div>
              </div>
            ) : (
              <img
                key={`${currentStep}-${currentStepData.image}`}
                src={currentStepData.image}
                alt={currentStepData.title[language]}
                className="w-full h-64 sm:h-72 lg:h-80 object-contain object-center transition-opacity duration-300 bg-gradient-to-br from-gray-900/20 to-gray-800/20"
                loading="eager"
                decoding="async"
                style={{ 
                  imageRendering: 'crisp-edges',
                  objectFit: 'contain'
                }}
                onLoad={() => {
                  setImageLoading(prev => ({ ...prev, [currentStep]: false }));
                }}
                onError={() => {
                  setImageLoading(prev => ({ ...prev, [currentStep]: false }));
                  setImageErrors(prev => ({ ...prev, [currentStep]: true }));
                }}
              />
            )}
          </div>

          {/* Text Content */}
          <div className="text-center mb-6">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3">
              {currentStepData.title[language]}
            </h3>
            <div className="text-white/90 text-xs sm:text-sm leading-relaxed text-left">
              {formatDescription(currentStepData.description[language])}
            </div>
          </div>

          {/* Buy bMEMEX Button (only on last step) */}
          {isLastStep && (
            <div className="mb-6 flex justify-center">
              <button
                onClick={handleBuyBmemex}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-orange-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm sm:text-base font-semibold">{t.buyBmemex}</span>
                </div>
              </button>
            </div>
          )}

          {/* Terms and Conditions (only on last step) */}
          {isLastStep && (
            <div className="mb-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <label className="flex items-start gap-2 cursor-pointer">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                    termsAccepted 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-600 border-yellow-500' 
                      : 'border-white/40 bg-white/10'
                  }`}>
                    {termsAccepted && (
                      <Check className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" />
                    )}
                  </div>
                </div>
                <span className="text-white/90 text-xs leading-relaxed">
                  I understand the risks involved in cross-chain bridging.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="p-3 sm:p-4 border-t border-white/10 flex-shrink-0">
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <button
              onClick={handlePrevious}
              disabled={isFirstStep}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg font-semibold text-xs transition-all duration-200 ${
                isFirstStep
                  ? 'bg-white/5 text-white/40 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
              }`}
            >
              <ChevronLeft className="w-3 h-3" />
              <span className="hidden sm:inline">{t.previous}</span>
              <span className="sm:hidden">{t.prev}</span>
            </button>

            {!isLastStep ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 shadow-lg text-xs"
              >
                {t.next}
                <ChevronRight className="w-3 h-3" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!termsAccepted}
                className={`px-4 py-2 font-semibold rounded-lg transition-all duration-200 shadow-lg text-xs ${
                  termsAccepted
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                <span className="hidden sm:inline">{t.goToBridge}</span>
                <span className="sm:hidden">{t.bridge}</span>
              </button>
            )}
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-1.5">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentStep
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BnbBridgeTutorialPopup;

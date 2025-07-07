import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Globe, Loader, ShoppingCart } from 'lucide-react';

interface BridgeTutorialStep {
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

interface BridgeTutorialPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type Language = 'en' | 'tr' | 'zh';

const BridgeTutorialPopup: React.FC<BridgeTutorialPopupProps> = ({ 
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
      buyOmemex: 'Buy OMEMEX',
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
      buyOmemex: 'OMEMEX Satın Al',
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
      buyOmemex: '购买 OMEMEX',
      termsText: '我了解跨链桥接的风险并同意',
      termsOfService: '服务条款',
      and: '和',
      privacyPolicy: '隐私政策',
      imageLoading: '图片加载中...'
    }
  };

  const steps: BridgeTutorialStep[] = [
    {
      id: 1,
      title: {
        en: "Bridge Your MEMEX Tokens",
        tr: "MEMEX Token'larınızı Köprüleyin",
        zh: "桥接您的MEMEX代币"
      },
      description: {
        en: "You can now bridge your MEMEX tokens from the XEP network to the powerful infrastructure of the OMAX chain!\n\nThe new network offers faster transactions and lower fees. Plus, OMAX has a hard-capped total supply of just 300 billion — which means a much higher potential for value growth.\n\nThis bridging opportunity offers special advantages for early adopters.\n\n🎯 Bridge now and be part of the next chapter.",
        tr: "Artık MEMEX token'larınızı XEP ağından OMAX zincirinin güçlü altyapısına köprüleyebilirsiniz!\n\nYeni ağ daha hızlı işlemler ve daha düşük ücretler sunuyor. Ayrıca OMAX'in sadece 300 milyar olan sabit toplam arzı var — bu da değer artışı için çok daha yüksek potansiyel anlamına geliyor.\n\nBu köprüleme fırsatı erken benimseyenler için özel avantajlar sunuyor.\n\n🎯 Şimdi köprüleyin ve bir sonraki bölümün parçası olun.",
        zh: "您现在可以将MEMEX代币从XEP网络桥接到OMAX链的强大基础设施！\n\n新网络提供更快的交易和更低的费用。此外，OMAX的总供应量硬性上限仅为3000亿——这意味着价值增长的潜力更高。\n\n这个桥接机会为早期采用者提供特殊优势。\n\n🎯 立即桥接，成为下一章的一部分。"
      },
      image: "/5953781874893637088 copy.jpg"
    },
    {
      id: 2,
      title: {
        en: "Understanding the Conversion Rate",
        tr: "Dönüşüm Oranını Anlama",
        zh: "了解转换比率"
      },
      description: {
        en: "The total MEMEX supply on the XEP network is 30 trillion.\nOn the OMAX network, the oMEMEX supply is strictly limited to 300 billion.\n\nDue to this significant supply difference, the conversion rate is set at 600:1.\nIn other words, 600 MEMEX = 1 oMEMEX, to maintain value equilibrium between the two chains.\n\nThis ratio doesn't put you at a disadvantage —\nbecause oMEMEX, with its lower supply, carries greater potential for value growth.\n\n💡 Additionally, only 50 billion oMEMEX are allocated for this bridge.\nOnce that limit is reached, bridging will close. Early movers gain the advantage.",
        tr: "XEP ağındaki toplam MEMEX arzı 30 trilyon.\nOMAX ağında, oMEMEX arzı kesinlikle 300 milyar ile sınırlı.\n\nBu önemli arz farkı nedeniyle, dönüşüm oranı 600:1 olarak belirlendi.\nBaşka bir deyişle, 600 MEMEX = 1 oMEMEX, iki zincir arasında değer dengesini korumak için.\n\nBu oran sizi dezavantajlı duruma sokmaz —\nçünkü daha düşük arzı olan oMEMEX, değer artışı için daha büyük potansiyel taşır.\n\n💡 Ayrıca, bu köprü için sadece 50 milyar oMEMEX ayrıldı.\nBu limite ulaşıldığında, köprüleme kapanacak. Erken hareket edenler avantaj kazanır.",
        zh: "XEP网络上的MEMEX总供应量为30万亿。\n在OMAX网络上，oMEMEX供应量严格限制为3000亿。\n\n由于这种显著的供应差异，转换比率设定为600:1。\n换句话说，600 MEMEX = 1 oMEMEX，以维持两条链之间的价值平衡。\n\n这个比率不会让您处于劣势——\n因为供应量较低的oMEMEX具有更大的价值增长潜力。\n\n💡 此外，只有500亿oMEMEX分配给这个桥接。\n一旦达到该限制，桥接将关闭。早期行动者获得优势。"
      },
      image: "/5953781874893637138.jpg"
    },
    {
      id: 3,
      title: {
        en: "Your Choice, Your Future",
        tr: "Seçiminiz, Geleceğiniz",
        zh: "您的选择，您的未来"
      },
      description: {
        en: "Bridging to oMEMEX is completely your choice.\nYou can choose to keep your MEMEX tokens on the XEP network\nand wait for exchange listings planned in Q4.\n\nDuring that time, you may have the opportunity to sell your tokens at a 1:1 value.\n\nBut if you'd prefer to join the oMEMEX ecosystem right away,\nyou can directly purchase oMEMEX on the OMAX network.\n\n🚀 Early buyers become early adopters. The choice is yours.",
        tr: "oMEMEX'e köprüleme tamamen sizin seçiminiz.\nMEMEX token'larınızı XEP ağında tutmayı\nve Q4'te planlanan borsa listelerini beklemeyi seçebilirsiniz.\n\nBu süre zarfında, token'larınızı 1:1 değerinde satma fırsatınız olabilir.\n\nAma hemen oMEMEX ekosistemine katılmayı tercih ederseniz,\nOMAX ağında doğrudan oMEMEX satın alabilirsiniz.\n\n🚀 Erken alıcılar erken benimseyen olur. Seçim sizin.",
        zh: "桥接到oMEMEX完全是您的选择。\n您可以选择将MEMEX代币保留在XEP网络上\n并等待第四季度计划的交易所上市。\n\n在此期间，您可能有机会以1:1的价值出售您的代币。\n\n但如果您更愿意立即加入oMEMEX生态系统，\n您可以直接在OMAX网络上购买oMEMEX。\n\n🚀 早期买家成为早期采用者。选择权在您。"
      },
      image: "/321sad copy.jpg"
    }
  ];

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;
  const isThirdStep = currentStep === 2; // 3rd step (index 2)
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

  const handleBuyOmemex = () => {
    window.open('https://swap.omax.app/swap', '_blank');
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
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
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
                className="appearance-none bg-white/10 border border-white/20 rounded-md px-2 py-1 text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4">
          {/* Image Container with Loading State */}
          <div className="mb-4 rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-lg relative">
            {imageLoading[currentStep] && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-sm z-10">
                <div className="flex flex-col items-center gap-2">
                  <Loader className="w-8 h-8 text-blue-400 animate-spin" />
                  <span className="text-white/70 text-xs">{t.imageLoading}</span>
                </div>
              </div>
            )}
            
            {imageErrors[currentStep] ? (
              <div className="w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
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
                className="w-full h-48 sm:h-56 lg:h-64 object-cover object-center transition-opacity duration-300"
                loading="eager"
                decoding="async"
                style={{ 
                  imageRendering: 'crisp-edges',
                  objectFit: 'cover'
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
          <div className="text-center mb-4">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3">
              {currentStepData.title[language]}
            </h3>
            <div className="text-white/90 text-xs sm:text-sm leading-relaxed text-left">
              {formatDescription(currentStepData.description[language])}
            </div>
          </div>

          {/* Buy OMEMEX Button (only on 3rd step) */}
          {isThirdStep && (
            <div className="mb-4 flex justify-center">
              <button
                onClick={handleBuyOmemex}
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-orange-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm sm:text-base font-semibold">{t.buyOmemex}</span>
                </div>
              </button>
            </div>
          )}

          {/* Terms and Conditions (only on last step) */}
          {isLastStep && (
            <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
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
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500' 
                      : 'border-white/40 bg-white/10'
                  }`}>
                    {termsAccepted && (
                      <Check className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" />
                    )}
                  </div>
                </div>
                <span className="text-white/90 text-xs leading-relaxed">
                  {t.termsText}{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                    {t.termsOfService}
                  </a>{' '}
                  {t.and}{' '}
                  <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                    {t.privacyPolicy}
                  </a>.
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
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg text-xs"
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
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600'
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

export default BridgeTutorialPopup;

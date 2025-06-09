import { useState, useEffect } from 'react';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_date: string;
  image: string;
}

const useCoinData = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoinData = async () => {
    try {
      setLoading(true);
      setError(null);

      const coinIds = ['electra-protocol', 'omax-token', 'bone-shibaswap'];
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(
          ','
        )}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const coinDataMap: { [key: string]: CoinData } = {};
      data.forEach((coin: any) => {
        coinDataMap[coin.id] = {
          id: coin.id.replace(/-/g, '_'), // Replace hyphens with underscores
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          market_cap_rank: coin.market_cap_rank,
          total_volume: coin.total_volume,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          circulating_supply: coin.circulating_supply,
          total_supply: coin.total_supply,
          max_supply: coin.max_supply,
          ath: coin.ath,
          ath_date: coin.ath_date,
          image: coin.image,
        };
      });

      // Manually override the IDs to match the existing logic
      const xep = coinDataMap['electra-protocol'];
      const omax = coinDataMap['omax-token'];
      const bone = coinDataMap['bone-shibaswap'];

      if (xep) xep.id = 'xep';
      if (omax) omax.id = 'omax';
      if (bone) bone.id = 'bone';

      setCoins([xep, omax, bone].filter(Boolean) as CoinData[]);
    } catch (err) {
      setError('Error fetching coin data');
      console.error('Error fetching coin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
    const interval = setInterval(fetchCoinData, 300000); // 5 minutes = 300000 ms
    return () => clearInterval(interval);
  }, []);

  return { coins, loading, error, refetch: fetchCoinData };
};

export default useCoinData;

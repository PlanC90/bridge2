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

  // Mock data for XEP and OMAX since they might not be available on CoinGecko
  const mockCoins: CoinData[] = [
    {
      id: 'xep',
      name: 'XEP Network',
      symbol: 'XEP',
      current_price: 0.0045,
      market_cap: 45000000,
      market_cap_rank: 1250,
      total_volume: 2500000,
      price_change_percentage_24h: 5.67,
      circulating_supply: 10000000000,
      total_supply: 21000000000,
      max_supply: 21000000000,
      ath: 0.0089,
      ath_date: '2024-01-15T00:00:00.000Z',
      image: 'https://pbs.twimg.com/profile_images/1331917259191808000/E1UyOz3m_400x400.png'
    },
    {
      id: 'omax',
      name: 'OMAX Token',
      symbol: 'OMAX',
      current_price: 0.0012,
      market_cap: 12000000,
      market_cap_rank: 2100,
      total_volume: 850000,
      price_change_percentage_24h: 8.92,
      circulating_supply: 10000000000,
      total_supply: 15000000000,
      max_supply: 20000000000,
      ath: 0.0034,
      ath_date: '2024-02-20T00:00:00.000Z',
      image: 'https://pbs.twimg.com/profile_images/1770163638512373760/TYC8AghW_400x400.jpg'
    }
  ];

  const fetchCoinData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let boneData = null;
      
      // Try to fetch real data for BONE from CoinGecko
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bone-shibaswap&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=24h',
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const boneCoin = data[0];
            boneData = {
              id: 'bone',
              name: boneCoin.name || 'Bone ShibaSwap',
              symbol: (boneCoin.symbol || 'BONE').toUpperCase(),
              current_price: boneCoin.current_price || 0,
              market_cap: boneCoin.market_cap || 0,
              market_cap_rank: boneCoin.market_cap_rank || 0,
              total_volume: boneCoin.total_volume || 0,
              price_change_percentage_24h: boneCoin.price_change_percentage_24h || 0,
              circulating_supply: boneCoin.circulating_supply || 0,
              total_supply: boneCoin.total_supply,
              max_supply: boneCoin.max_supply,
              ath: boneCoin.ath || 0,
              ath_date: boneCoin.ath_date || new Date().toISOString(),
              image: boneCoin.image || 'https://assets.coingecko.com/coins/images/16916/standard/bone_icon.png'
            };
          }
        }
      } catch (apiError) {
        console.log('CoinGecko API error:', apiError);
      }

      // If CoinGecko API fails, use mock data for BONE
      if (!boneData) {
        boneData = {
          id: 'bone',
          name: 'Bone ShibaSwap',
          symbol: 'BONE',
          current_price: 0.78,
          market_cap: 180000000,
          market_cap_rank: 450,
          total_volume: 15000000,
          price_change_percentage_24h: -2.34,
          circulating_supply: 230769230,
          total_supply: 250000000,
          max_supply: 250000000,
          ath: 41.67,
          ath_date: '2021-10-28T00:00:00.000Z',
          image: 'https://assets.coingecko.com/coins/images/16916/standard/bone_icon.png'
        };
      }

      // Order: XEP first, OMAX second, BONE third
      const orderedCoins = [
        mockCoins.find(coin => coin.id === 'xep')!,
        mockCoins.find(coin => coin.id === 'omax')!,
        boneData
      ];

      setCoins(orderedCoins);
    } catch (err) {
      setError('Error fetching coin data');
      console.error('Error fetching coin data:', err);
      
      // Fallback to mock data with correct order
      const fallbackBone = {
        id: 'bone',
        name: 'Bone ShibaSwap',
        symbol: 'BONE',
        current_price: 0.78,
        market_cap: 180000000,
        market_cap_rank: 450,
        total_volume: 15000000,
        price_change_percentage_24h: -2.34,
        circulating_supply: 230769230,
        total_supply: 250000000,
        max_supply: 250000000,
        ath: 41.67,
        ath_date: '2021-10-28T00:00:00.000Z',
        image: 'https://assets.coingecko.com/coins/images/16916/standard/bone_icon.png'
      };

      setCoins([
        mockCoins.find(coin => coin.id === 'xep')!,
        mockCoins.find(coin => coin.id === 'omax')!,
        fallbackBone
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
    // Update data every 5 minutes (300000 ms)
    const interval = setInterval(fetchCoinData, 300000);
    return () => clearInterval(interval);
  }, []);

  return { coins, loading, error, refetch: fetchCoinData };
};

export default useCoinData;

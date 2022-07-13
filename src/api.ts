export interface ICoin {
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  rank: number;
  symbol: string;
  type: string;
}

export async function getCoins() {
  const baseUrl = "https://api.coinpaprika.com/v1";
  return await (await fetch(`${baseUrl}/coins`)).json();
}

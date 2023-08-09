export type ExchangeRate = {
  Cur_ID: number;
  Date: string;
  Cur_OfficialRate: number;
};

export async function getExchangeRates(
  startDate: string,
  endDate: string
): Promise<ExchangeRate[]> {
  const url = `https://api.nbrb.by/exrates/rates/dynamics/431?periodicity=0&startDate=${startDate}&endDate=${endDate}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      throw new Error('');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('');
  }
}

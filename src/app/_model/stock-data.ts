export interface StockData {
  'Meta Data': MetaData;
  'Time Series (Daily)': DailyStock[];
}

export interface MetaData {
  '1. Information': string;
  '2. Symbol': string;
  '3. Last Refreshed': string;
  '4. Output Size': string;
  '5. Time Zone': string;
}

export interface DailyStock {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. volume': string;
}

export enum TYPE {
  '1. open' = 'open',
  '2. high' = 'high',
  '3. low' = 'low',
  '4. close' = 'close',
  '5. volume' = 'volume'
}

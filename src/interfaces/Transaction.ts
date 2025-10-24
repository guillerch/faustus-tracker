
export type TransactionType = 'buy' | 'sell';
export type TransactionStatus = 'pending' | 'confirmed' | 'cancelled';

export type Currency = 'Divine' | 'Exalted' | 'Orb of Alchemy' | 'Jeweller\'s Orb' | 'Chromium';

// Export the array of currency options
export const CURRENCY_OPTIONS: Currency[] = [
  'Divine',
  'Exalted',
  'Orb of Alchemy',
  'Jeweller\'s Orb',
  'Chromium',
];

export interface Transaction {
  id: string;
  currency: Currency; // Use the defined type
  type: TransactionType;
  quantity: number;
  price: number; // Price in Chaos Orbs
  total: number; // quantity * price
  status: TransactionStatus;
  createdAt: Date;
}

// ----------------------------------------------------------------
// INTERFACE PARA EL RESULTADO DEL ANÁLISIS DE PARES
// ----------------------------------------------------------------
export interface PairAnalysis {
    targetCurrency: string; // Ej: "Divine"
    
    // Tasa promedio a la que la moneda fue COMPRADA (lo que PAGASTE por ella)
    avgBuyRate: number | null; 
    
    // Tasa promedio a la que la moneda fue VENDIDA (lo que RECIBISTE por ella)
    avgSellRate: number | null; 
    
    // Profit Potencial (la oportunidad de arbitraje) = avgSellRate - avgBuyRate
    potentialProfit: number; 
}

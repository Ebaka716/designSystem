'use client';

import React from 'react';
import { DetailQuoteV1 } from '@/components/DetailQuote';

export default function DetailQuotePage() {
  // Example data (can be fetched or passed as props)
  const sampleQuote = {
    symbol: 'MSFT',
    lastPrice: 430.16,
    change: 1.98,
    changePercent: 0.46,
    bid: 430.15,
    ask: 430.17,
    volume: '18.2M',
    marketCap: '3.2T'
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Detail Quote Component</h2>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Default (Placeholder Data)</h3>
        <DetailQuoteV1 />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">With Sample Data (MSFT)</h3>
        <DetailQuoteV1 quoteData={sampleQuote} className="max-w-xs"/>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">With Positive Change</h3>
        <DetailQuoteV1 quoteData={{ ...sampleQuote, change: 5.50, changePercent: 1.29 }} className="max-w-xs"/>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">With Missing Data</h3>
        <DetailQuoteV1 quoteData={{ symbol: 'GOOG', lastPrice: 180.00 }} className="max-w-xs"/>
      </div>
    </div>
  );
} 
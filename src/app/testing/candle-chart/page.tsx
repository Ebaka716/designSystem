'use client';

import React from 'react';
import { CandleChartV1 } from '@/components/CandleChart';
import { CardV1 } from '@/components/Card/v1';

export default function CandleChartPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Candle Chart Component</h2>
      
      <CardV1 
        cardTitle="Default Symbol (AAPL)" 
        contentProps={{ className: 'px-4' }} 
      > 
        <CandleChartV1 />
      </CardV1>
      
      <CardV1 
        cardTitle="MSFT Symbol"
        contentProps={{ className: 'px-4' }}
      >
        <CandleChartV1 />
      </CardV1>
    </div>
  );
} 
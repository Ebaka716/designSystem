'use client';

import React from 'react';
import { CardV1 } from '@/components/Card/v1';
import { DetailRowV1 } from '@/components/DetailRow/v1';
import { cn } from '@/lib/utils';

interface DetailQuoteProps extends React.HTMLAttributes<HTMLDivElement> {
  quoteData?: {
    // Keep some original ones that might still be relevant contextually
    symbol?: string;
    lastPrice?: string | number; 
    change?: string | number;
    changePercent?: string | number;

    // New fields based on request
    open?: string | number;
    previousClose?: string | number;
    peRatio?: string | number;
    options?: string; // e.g., "Available", "Not Available"
    currentDividend?: string | number;
    exDate?: string;
    estimatedDividendRate?: string | number;
    estimatedYield?: string | number;
    sector?: string;
    marketCap?: string | number; // Keep market cap
    volume?: string | number; // Keep volume
  };
}

export function DetailQuoteV1({ className, quoteData, ...props }: DetailQuoteProps) {
  // Updated placeholder data
  const data = quoteData || {
    symbol: 'AAPL', // Keep symbol for context if needed elsewhere
    open: 176.00,
    previousClose: 176.75,
    peRatio: 28.5,
    options: 'Available',
    currentDividend: 0.96,
    exDate: 'Aug 10, 2024',
    estimatedDividendRate: 0.96,
    estimatedYield: 0.55, // As percentage
    sector: 'Technology',
    marketCap: '2.7T',
    volume: '55.6M' // Keep volume for context
  };

  // Helper to format combined fields
  const formatDividendExDate = (dividend?: string | number, exDate?: string) => {
    const div = dividend?.toString() ?? '-';
    const date = exDate ?? '-';
    return `${div} / ${date}`;
  };

  const formatRateYield = (rate?: string | number, yieldVal?: string | number) => {
    const r = rate?.toString() ?? '-';
    const y = yieldVal ? `${yieldVal.toString()}%` : '-';
    return `${r} / ${y}`;
  };

  // Updated rows definition
  const rows = [
    { id: 'dq-open', label: 'Open', value: data.open?.toString() },
    { id: 'dq-prev-close', label: 'Previous close', value: data.previousClose?.toString() },
    { id: 'dq-pe', label: 'P/E ratio', value: data.peRatio?.toString() },
    { id: 'dq-options', label: 'Options', value: data.options },
    { id: 'dq-curr-div', label: 'Current dividend/ex-date', value: formatDividendExDate(data.currentDividend, data.exDate) },
    { id: 'dq-est-div', label: 'Estimated dividend rate/yield', value: formatRateYield(data.estimatedDividendRate, data.estimatedYield) },
    { id: 'dq-sector', label: 'Sector', value: data.sector },
    { id: 'dq-mkt-cap', label: 'Market cap', value: data.marketCap },
  ];

  return (
    <CardV1
      className={cn("shadow-none", className)}
      contentProps={{ className: 'p-0' }} 
      {...props}
    >
      {rows.map((row, index) => (
        <DetailRowV1
          key={row.id}
          primaryText={row.label}
          actionContent={
            <span className={cn("text-sm", 'text-foreground')}> {/* Simplified color logic for now */}
              {row.value ?? '-'} 
            </span>
          }
          className={cn("px-4 py-2", index > 0 && "border-t border-border")}
        />
      ))}
    </CardV1>
  );
} 
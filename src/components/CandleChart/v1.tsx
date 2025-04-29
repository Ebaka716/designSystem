'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { 
  createChart, 
  ColorType, 
  CrosshairMode, 
  LineStyle, 
  CandlestickSeries,
  HistogramSeries,
  IChartApi,
  ISeriesApi 
} from 'lightweight-charts';
import { cn } from '@/lib/utils';

// Helper to generate sample data (similar structure to previous one)
function generateSampleData(count = 100) {
  const startDate = new Date(2024, 0, 1);
  let lastClose = 100;
  const data = [];

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    // Format date as YYYY-MM-DD for lightweight-charts
    const time = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    const open = parseFloat((lastClose * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2));
    const high = parseFloat((Math.max(open, lastClose) * (1 + Math.random() * 0.015)).toFixed(2));
    const low = parseFloat((Math.min(open, lastClose) * (1 - Math.random() * 0.015)).toFixed(2));
    const close = parseFloat((low + Math.random() * (high - low)).toFixed(2));
    const volume = Math.floor(Math.random() * 1000000 + 50000);
    const color = close > open ? 'rgba(38, 166, 154, 0.5)' : 'rgba(239, 83, 80, 0.5)'; // Semi-transparent green/red

    data.push({
      time: time, // Needs to be 'time' field
      open: open,
      high: high,
      low: low,
      close: close,
      volume: volume,
      color: color, // For volume bars
    });
    lastClose = close;
  }
  return data;
}

interface CandleChartProps extends React.HTMLAttributes<HTMLDivElement> {
  symbol?: string;
  initialData?: any[];
  backgroundColor?: string;
  lineColor?: string;
  textColor?: string;
  upColor?: string;
  downColor?: string;
}

export function CandleChartV1({ 
  className,
  symbol = 'AAPL',
  initialData,
  backgroundColor = '#ffffff', // Default white background
  lineColor = '#2962FF', // Example line color
  textColor = '#1f1f1f', // Default dark text
  upColor = '#26a69a', // Green for up candles
  downColor = '#ef5350', // Red for down candles
  ...props 
}: CandleChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartApiRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const candleData = useMemo(() => {
    const data = initialData || generateSampleData(150);
    // Ensure data is sorted by time for lightweight-charts
    return data.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  }, [initialData]);

  const volumeData = useMemo(() => 
    candleData.map(item => ({ time: item.time, value: item.volume, color: item.color })), 
    [candleData]
  );

  useEffect(() => {
    if (!chartContainerRef.current || candleData.length === 0) return;

    const handleResize = () => {
      if (chartApiRef.current) {
        chartApiRef.current.applyOptions({ width: chartContainerRef.current!.clientWidth });
      }
    };

    chartApiRef.current = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor: textColor,
      },
      grid: {
        vertLines: { color: 'rgba(197, 203, 206, 0.2)' },
        horzLines: { color: 'rgba(197, 203, 206, 0.2)' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.4)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.4)',
        timeVisible: true,
        secondsVisible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 350, // Use fixed height for internal chart area
    });

    const chart = chartApiRef.current;

    candleSeriesRef.current = chart.addSeries(CandlestickSeries, {
      upColor: upColor,
      downColor: downColor,
      borderVisible: false,
      wickUpColor: upColor,
      wickDownColor: downColor,
    });
    candleSeriesRef.current.setData(candleData);

    volumeSeriesRef.current = chart.addSeries(HistogramSeries, {
        color: '#26a69a',
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: 'volume_scale',
    });
    chart.priceScale('volume_scale')?.applyOptions({
        scaleMargins: {
            top: 0.7,
            bottom: 0,
        },
        visible: false,
    });
    volumeSeriesRef.current.setData(volumeData);

    chart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartApiRef.current) {
         chartApiRef.current.remove();
         chartApiRef.current = null;
      }
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, [
    candleData, 
    volumeData,
    backgroundColor, 
    lineColor, 
    textColor, 
    upColor, 
    downColor,
  ]);

  return (
    <div className={cn("border rounded-lg p-2", className)} {...props}>
      {/* Container for the chart */}
      <div ref={chartContainerRef} style={{ width: '100%', height: '350px' }} />
      {/* Placeholder controls */}
      <div className="mt-2 flex space-x-2 justify-center">
        <button className="px-2 py-1 text-xs border rounded bg-background hover:bg-muted">1D</button>
        <button className="px-2 py-1 text-xs border rounded bg-background hover:bg-muted">5D</button>
        <button className="px-2 py-1 text-xs border rounded bg-background hover:bg-muted">1M</button>
        <button className="px-2 py-1 text-xs border rounded bg-primary text-primary-foreground">6M</button>
        <button className="px-2 py-1 text-xs border rounded bg-background hover:bg-muted">YTD</button>
        <button className="px-2 py-1 text-xs border rounded bg-background hover:bg-muted">1Y</button>
        <button className="px-2 py-1 text-xs border rounded bg-background hover:bg-muted">MAX</button>
      </div>
    </div>
  );
} 
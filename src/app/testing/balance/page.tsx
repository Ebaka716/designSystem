'use client';

import React from 'react';
import { CardV1 } from '@/components/Card/v1';
import { ButtonV2 } from '@/components/Button/v2';
import { Info } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
} from 'recharts';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

// --- Balance Chart Data (Sample) ---
// TODO: Consider moving sample data to a shared location if needed elsewhere
const balanceChartData = [
  { date: 'Apr 23, 2024', value: 230000 },
  { date: 'Jul 23, 2024', value: 250000 },
  { date: 'Oct 23, 2024', value: 265000 },
  { date: 'Jan 23, 2025', value: 280000 },
  { date: 'Mar 23, 2025', value: 340000 },
  { date: 'Apr 23, 2025', value: 336164.98 },
];

export default function BalanceCardTestingPage() {
  return (
    // Use React Fragment to avoid adding extra divs/sections
    <>
      <h2 className="text-2xl font-semibold mb-4">Balance Card Example (Size Variations)</h2>
      <div className="flex flex-wrap gap-6 items-start"> { /* Flex container for cards */ }

        {/* Large Version */}
        <div className="max-w-3xl w-full"> { /* Wrapper for large size */ }
          <h3 className="text-lg font-medium mb-2">Large (max-w-3xl)</h3>
          <CardV1
            className="shadow-md"
            cardTitle={
              <div className="flex justify-between items-center">
                <span>Balance</span>
                <ButtonV2 variant="ghost" size="icon" aria-label="Info">
                  <Info className="size-4" />
                </ButtonV2>
              </div>
            }
            contentProps={{ className: 'space-y-4' }}
            cardContent={
              <>
                <div>
                  <p className="text-3xl font-semibold">$567,945.00</p>
                  <div className="flex items-baseline space-x-2 pt-1">
                    <span className="text-sm font-medium text-green-600">+$6,148.05 (+1.86%)</span>
                    <span className="text-xs text-muted-foreground">Today&apos;s gain/loss</span>
                  </div>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={balanceChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" tickFormatter={(value, index) => index === 0 || index === balanceChartData.length - 1 ? value : ''} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                      <YAxis orientation="right" domain={['dataMin - 20000', 'dataMax + 20000']} tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`} axisLine={false} tickLine={false} width={50} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                      <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center pt-2">
                  <ToggleGroup type="single" defaultValue="1y" variant="outline">
                    <ToggleGroupItem value="1m" aria-label="Toggle 1 month">1M</ToggleGroupItem>
                    <ToggleGroupItem value="ytd" aria-label="Toggle year-to-date">YTD</ToggleGroupItem>
                    <ToggleGroupItem value="1y" aria-label="Toggle 1 year">1Y</ToggleGroupItem>
                    <ToggleGroupItem value="3y" aria-label="Toggle 3 year">3Y</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </>
            }
            footer={
              <ButtonV2 variant="ghost" size="sm">View your performance</ButtonV2>
            }
          />
        </div>

        {/* Medium Version */}
        <div className="max-w-md w-full"> { /* Wrapper for medium size */ }
          <h3 className="text-lg font-medium mb-2">Medium (max-w-md)</h3>
          <CardV1
            className="shadow-md"
            cardTitle={
              <div className="flex justify-between items-center">
                <span>Balance</span>
                <ButtonV2 variant="ghost" size="icon" aria-label="Info">
                  <Info className="size-4" />
                </ButtonV2>
              </div>
            }
            contentProps={{ className: 'space-y-4' }}
            cardContent={
              <>
                <div>
                  <p className="text-3xl font-semibold">$567,945.00</p>
                  <div className="flex items-baseline space-x-2 pt-1">
                    <span className="text-sm font-medium text-green-600">+$6,148.05 (+1.86%)</span>
                    <span className="text-xs text-muted-foreground">Today&apos;s gain/loss</span>
                  </div>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={balanceChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" tickFormatter={(value, index) => index === 0 || index === balanceChartData.length - 1 ? value : ''} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                      <YAxis orientation="right" domain={['dataMin - 20000', 'dataMax + 20000']} tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`} axisLine={false} tickLine={false} width={50} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                      <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center pt-2">
                  <ToggleGroup type="single" defaultValue="1y" variant="outline">
                    <ToggleGroupItem value="1m" aria-label="Toggle 1 month">1M</ToggleGroupItem>
                    <ToggleGroupItem value="ytd" aria-label="Toggle year-to-date">YTD</ToggleGroupItem>
                    <ToggleGroupItem value="1y" aria-label="Toggle 1 year">1Y</ToggleGroupItem>
                    <ToggleGroupItem value="3y" aria-label="Toggle 3 year">3Y</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </>
            }
            footer={
              <ButtonV2 variant="ghost" size="sm">View your performance</ButtonV2>
            }
          />
        </div>

        {/* Small Version */}
        <div className="max-w-sm w-full"> { /* Wrapper for small size */ }
          <h3 className="text-lg font-medium mb-2">Small (max-w-sm)</h3>
          <CardV1
            className="shadow-md"
            cardTitle={
              <div className="flex justify-between items-center">
                <span>Balance</span>
                <ButtonV2 variant="ghost" size="icon" aria-label="Info">
                  <Info className="size-4" />
                </ButtonV2>
              </div>
            }
            contentProps={{ className: 'space-y-4' }}
            cardContent={
              <>
                <div>
                  <p className="text-3xl font-semibold">$567,945.00</p>
                  <div className="flex items-baseline space-x-2 pt-1">
                    <span className="text-sm font-medium text-green-600">+$6,148.05 (+1.86%)</span>
                    <span className="text-xs text-muted-foreground">Today&apos;s gain/loss</span>
                  </div>
                </div>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={balanceChartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" tickFormatter={(value, index) => index === 0 || index === balanceChartData.length - 1 ? value : ''} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                      <YAxis orientation="right" domain={['dataMin - 20000', 'dataMax + 20000']} tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`} axisLine={false} tickLine={false} width={50} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                      <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center pt-2">
                  <ToggleGroup type="single" defaultValue="1y" variant="outline">
                    <ToggleGroupItem value="1m" aria-label="Toggle 1 month">1M</ToggleGroupItem>
                    <ToggleGroupItem value="ytd" aria-label="Toggle year-to-date">YTD</ToggleGroupItem>
                    <ToggleGroupItem value="1y" aria-label="Toggle 1 year">1Y</ToggleGroupItem>
                    <ToggleGroupItem value="3y" aria-label="Toggle 3 year">3Y</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </>
            }
            footer={
              <ButtonV2 variant="ghost" size="sm">View your performance</ButtonV2>
            }
          />
        </div>

      </div> { /* Close flex container */ }
    </>
  );
} 
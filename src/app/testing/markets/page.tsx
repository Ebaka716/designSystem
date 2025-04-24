'use client';

import React from 'react';
import { CardV1 } from '@/components/Card/v1';
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// TODO: Move this shared data to a common location
const chartData = [
  { time: '10A', value: 2400 },
  { time: '11A', value: 2600 },
  { time: '12P', value: 2500 },
  { time: '1P', value: 2780 },
  { time: '2P', value: 2890 },
  { time: '3P', value: 2950 },
  { time: '4P', value: 3100 },
];

export default function MarketsTestingPage() {
  return (
    <>
      <div className="max-w-2xl mx-auto"> { /* Increased width for demo */ }
        <CardV1
          className="shadow-md"
          cardTitle="Markets"
          description="U.S. markets closed."
          contentProps={{ className: 'space-y-4' }} // Add spacing to content area
          cardContent={
            <>
              {/* Index Section (3 Columns) */}
              <div className="grid grid-cols-3 gap-x-6"> { /* Use gap-x for horizontal spacing */ }
                {/* DJIA */}
                <div className="space-y-1">
                  <p className="text-sm font-medium">DJIA</p>
                  <p className="text-lg font-semibold">40,093.40</p>
                  <p className="text-sm text-green-600">+486.83</p>
                  <p className="text-sm text-green-600">(+1.23%)</p>
                  <div className="h-16 w-full mt-2"> { /* Chart Container */ }
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                        <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide={true} axisLine={false} tickLine={false} />
                        <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-1">
                    <span>T</span>
                    <span>11A</span>
                    <span>1P</span>
                    <span>3P</span>
                  </div>
                </div>
                {/* NASDAQ */}
                <div className="space-y-1">
                  <p className="text-sm font-medium">NASDAQ</p>
                  <p className="text-lg font-semibold">17,166.04</p>
                  <p className="text-sm text-green-600">+457.99</p>
                  <p className="text-sm text-green-600">(+2.74%)</p>
                  <div className="h-16 w-full mt-2"> { /* Chart Container */ }
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                        <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide={true} axisLine={false} tickLine={false} />
                        <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-1">
                    <span>T</span>
                    <span>11A</span>
                    <span>1P</span>
                    <span>3P</span>
                  </div>
                </div>
                {/* S&P 500 */}
                <div className="space-y-1">
                  <p className="text-sm font-medium">S&P 500</p>
                  <p className="text-lg font-semibold">5,484.77</p>
                  <p className="text-sm text-green-600">+108.91</p>
                  <p className="text-sm text-green-600">(+2.03%)</p>
                  <div className="h-16 w-full mt-2"> { /* Chart Container */ }
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                        <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide={true} axisLine={false} tickLine={false} />
                        <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground pt-1">
                    <span>T</span>
                    <span>11A</span>
                    <span>1P</span>
                    <span>3P</span>
                  </div>
                </div>
              </div>

              <hr />

              {/* Commodities/Other Section (4 Columns) */}
              <div className="grid grid-cols-4 gap-x-4"> { /* Use gap-x */ }
                {/* Crude Oil */}
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Crude Oil</p>
                  <p className="text-sm">62.79</p>
                  <p className="text-sm text-red-600">(0.00%)</p>
                </div>
                {/* Gold */}
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Gold</p>
                  <p className="text-sm">3,348.60</p>
                  <p className="text-sm text-red-600">(0.00%)</p>
                </div>
                {/* U.S. 10 Year */}
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">U.S. 10 Year</p>
                  <p className="text-sm">111.22</p>
                  <p className="text-sm text-red-600">(0.00%)</p>
                </div>
                {/* Bitcoin */}
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Bitcoin</p>
                  <p className="text-sm">93,534.95</p>
                  <p className="text-sm text-green-600">+821.95</p> { /* Added absolute change */ }
                  <p className="text-sm text-green-600">(+0.89%)</p>
                </div>
              </div>

              {/* Footer Note */}
              <p className="text-xs text-muted-foreground pt-2">
                Crude Oil and Gold delayed 10 mins
              </p>
            </>
          }
          // No footer prop used for this card
        />
      </div>
    </>
  );
} 
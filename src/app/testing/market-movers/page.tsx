'use client';

import React from 'react';
import { CardV1 } from '@/components/Card/v1';
import { ButtonV2 } from '@/components/Button/v2';
import { Info } from 'lucide-react'; 
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils"; 

// TODO: Move this shared data to a common location
const marketMoversData = [
  { symbol: 'SOXL', last: '$12.00', change: '+16.62%', volume: '334.0M', positive: true },
  { symbol: 'NVDA', last: '$106.43', change: '+3.62%', volume: '218.8M', positive: true },
  { symbol: 'TSLL', last: '$8.74', change: '+6.59%', volume: '163.7M', positive: true },
  { symbol: 'SQQQ', last: '$32.72', change: '-8.50%', volume: '120.4M', positive: false },
];

export default function MarketMoversTestingPage() {
  return (
    <section id="market-movers-card" className="space-y-8">
      <h2 className="text-2xl font-semibold">Market Movers Card Example</h2>
      <div className="max-w-md mx-auto"> { /* Constrain width for demo */ }
        <CardV1
          className="shadow-md" // Add back shadow for this example
          cardTitle={
            <div className="flex justify-between items-center">
              <span>Market Movers</span>
              <ButtonV2 variant="ghost" size="icon" aria-label="Info">
                <Info className="size-4" />
              </ButtonV2>
            </div>
          }
          description="As of Apr-24-2025 4:10 PM ET" // Example timestamp
          contentProps={{ className: 'space-y-4' }} // Add spacing to content area
          cardContent={
            <>
              {/* Filter Section */}
              <div className="flex flex-wrap gap-4 justify-between items-end">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Category</label>
                  <Select defaultValue="most-actives">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="most-actives">Most actives</SelectItem>
                      <SelectItem value="gainers">Gainers</SelectItem>
                      <SelectItem value="losers">Losers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Market</label>
                  <Select defaultValue="all-markets">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-markets">Across all markets</SelectItem>
                      <SelectItem value="nyse">NYSE</SelectItem>
                      <SelectItem value="nasdaq">NASDAQ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <hr />

              {/* Table Section */}
              <div> { /* Removed negative margin */ }
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Symbol</TableHead>
                      <TableHead>Last</TableHead>
                      <TableHead>% Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketMoversData.map((item) => (
                      <TableRow key={item.symbol}>
                        <TableCell className="font-medium">
                          <span className="border-b border-dotted border-foreground pb-0.5">
                            {item.symbol}
                          </span>
                        </TableCell>
                        <TableCell>{item.last}</TableCell>
                        <TableCell 
                          className={cn(
                            item.positive ? 'text-green-600' : 'text-red-600'
                          )}
                        >
                          {item.change}
                        </TableCell>
                        <TableCell className="text-right">{item.volume}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          }
          footer={
            // Changed to a standard small ghost button (default left alignment)
            <ButtonV2 variant="ghost" size="sm">
              View more
            </ButtonV2>
          }
        />
      </div>
    </section>
  );
} 
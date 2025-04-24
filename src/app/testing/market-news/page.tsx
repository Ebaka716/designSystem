'use client';

import React from 'react';
import { CardV1 } from '@/components/Card/v1';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// --- Market News Data (Sample) ---
const marketNewsData = [
  {
    id: 'news1',
    headline: 'Trump trade war spreads more gloom across businesses worldwide',
    source: 'Reuters', time: '3:15 PM ET', date: 'Apr-24-2025'
  },
  {
    id: 'news2',
    headline: 'Wall Street ends higher on tech boost, easing tariff tensions',
    source: 'Reuters', time: '4:23 PM ET', date: 'Apr-24-2025'
  },
  {
    id: 'news3',
    headline: 'US labor market holds steady for now; tariffs keep businesses on edge',
    source: 'Reuters', time: '12:53 PM ET', date: 'Apr-24-2025'
  },
  {
    id: 'news4',
    headline: 'US durable goods orders soar on aircraft bookings in March',
    source: 'Reuters', time: '9:11 AM ET', date: 'Apr-24-2025'
  },
  {
    id: 'news5',
    headline: 'Intel forecasts weak revenue amid trade tensions, shares fall',
    source: 'Reuters', time: '33 mins ago', date: null // Example with relative time
  },
];

export default function MarketNewsTestingPage() {
  return (
    <section id="market-news-card" className="space-y-8">
      <h2 className="text-2xl font-semibold">Market News Card Example</h2>
      <div className="max-w-md mx-auto"> { /* Constrain width */ }
        <CardV1
          className="shadow-md"
          cardTitle="Market news"
          contentProps={{ className: 'space-y-4' }} // Add spacing to content area
          cardContent={
            <>
              {/* Filter Dropdown */}
              <Select defaultValue="top-news">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select news type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-news">Top news</SelectItem>
                  <SelectItem value="my-feed">My Feed</SelectItem>
                  <SelectItem value="saved">Saved</SelectItem>
                </SelectContent>
              </Select>

              {/* News List */}
              <div className="space-y-5 pt-2"> { /* Add padding-top and space between items */ }
                {marketNewsData.map((news) => (
                  <div key={news.id}>
                    <a href="#" className="font-medium text-sm hover:underline">
                      {news.headline}
                    </a>
                    <p className="text-xs text-muted-foreground pt-1">
                      {news.source} · {news.time} {news.date ? `· ${news.date}` : ''}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="pt-2" /> { /* Add padding-top to push HR down */ }

              {/* Pagination */}
              <div className="flex justify-end items-center space-x-4 text-sm font-medium">
                <span className="text-primary">1</span> { /* Example active page */ }
                <a href="#" className="text-muted-foreground hover:text-primary">2</a>
                <a href="#" className="text-muted-foreground hover:text-primary">Next</a>
              </div>
            </>
          }
          // No footer prop used
        />
      </div>
    </section>
  );
} 
'use client';

import React from 'react';
import { CardV1 } from '@/components/Card/v1';
import { cn } from "@/lib/utils"; 
import { DetailRowV1 } from "@/components/DetailRow/v1"; 
import { ButtonV2 } from '@/components/Button/v2';
import { CardActionFooterV1 } from "@/components/CardActionFooter/v1"; 

export default function CardRowLayoutsTestingPage() {

  // --- Simple Card Row Layout Data ---
  const simpleCardLayoutExamples = [
    {
      id: '4-cards',
      title: '4 Cards per Row (flex-wrap)',
      cards: [
        { id: 'c1', cardTitle: 'Card 1', cardContent: 'Content for card 1.', minWidth: '250px' },
        { id: 'c2', cardTitle: 'Card 2', cardContent: 'Content for card 2.', minWidth: '250px' },
        { id: 'c3', cardTitle: 'Card 3', cardContent: 'Content for card 3.', minWidth: '250px' },
        { id: 'c4', cardTitle: 'Card 4', cardContent: 'Content for card 4.', minWidth: '250px' },
      ],
    },
    {
      id: '3-cards',
      title: '3 Cards per Row (flex-wrap)',
      cards: [
        { id: 'cX', cardTitle: 'Card X', cardContent: 'Content for card X.', minWidth: '250px' },
        { id: 'cY', cardTitle: 'Card Y', cardContent: 'Content for card Y.', minWidth: '250px' },
        { id: 'cZ', cardTitle: 'Card Z', cardContent: 'Content for card Z.', minWidth: '250px' },
      ],
    },
    {
      id: '2-cards',
      title: '2 Cards per Row (flex-wrap)',
      cards: [
        { id: 'cA', cardTitle: 'Card A', cardContent: 'Content for card A.', minWidth: '300px' },
        { id: 'cB', cardTitle: 'Card B', cardContent: 'Content for card B.', minWidth: '300px' },
      ],
    },
    {
      id: '1-card',
      title: '1 Card per Row (flex-wrap)',
      cards: [
        { id: 's1', cardTitle: 'Single Card', cardContent: 'This card takes up available space but will wrap if screen is narrow.', minWidth: '200px' },
      ],
    },
  ];

  // --- Reusable Card Components for Row Layouts ---
  // TODO: Consider moving these helper components if reused elsewhere
  const MultipleAccountsCardContent = () => (
    <div className="p-0"> {/* Ensure no padding from parent if contentProps specify it */} 
      <DetailRowV1 primaryText="Primary Checking" secondaryText="**** 1234" actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} className="px-6 py-3" />
      <DetailRowV1 primaryText="Savings Account" secondaryText="**** 5678" actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} className="border-t border-border px-6 py-3"/>
      <DetailRowV1 primaryText="Credit Card" secondaryText="**** 9900 - Due Aug 15" actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} className="border-t border-border px-6 py-3"/>
      <DetailRowV1 primaryText="Investment Portfolio" secondaryText="**** 4321" actionContent={<span className="text-sm font-medium text-blue-600">$115,300.75</span>} className="border-t border-border px-6 py-3"/>
    </div>
  );

  const MultipleAccountsFooter1 = () => (
    <CardActionFooterV1 secondaryAction={<ButtonV2 variant="outline">Manage Accounts</ButtonV2>} primaryAction={<ButtonV2 variant="default" size="default">Transfer Funds</ButtonV2>}/>
  );

  const MultipleAccountsFooter2 = () => (
    <CardActionFooterV1 secondaryAction={<ButtonV2 variant="outline">Manage</ButtonV2>} primaryAction={<ButtonV2 variant="default" size="sm">Transfer</ButtonV2>}/>
  );

  // --- Complex Card Layout Data ---
  const complexCardLayoutExamples = [
    {
      id: '2-complex',
      title: "2 'Multiple Accounts' Cards per Row",
      count: 2,
      minWidth: '400px',
      cardProps: {
        cardTitle: "Multiple Accounts",
        description: "List of linked accounts",
        contentProps: { className: 'p-0' },
        cardContent: <MultipleAccountsCardContent />,
        footer: <MultipleAccountsFooter1 />
      }
    },
    {
      id: '3-complex',
      title: "3 'Multiple Accounts' Cards per Row",
      count: 3,
      minWidth: '300px',
      cardProps: {
        cardTitle: "Multiple Accounts",
        description: "List of linked accounts",
        contentProps: { className: 'p-0' },
        cardContent: <MultipleAccountsCardContent />,
        footer: <MultipleAccountsFooter2 />
      }
    }
  ];

  return (
    <section id="card-row-layouts-section" className="space-y-8">
      <h2 className="text-2xl font-semibold">Card Row Layouts (Flexbox Examples)</h2>

      {/* Simple Card Examples (Mapped) */}
      {simpleCardLayoutExamples.map((layout) => (
        <div key={layout.id}>
          <h3 className="text-lg font-medium mb-2">{layout.title}</h3>
          <div className="flex flex-wrap gap-6 p-4 border rounded">
            {layout.cards.map((card) => (
              <CardV1 
                key={card.id}
                cardTitle={card.cardTitle}
                cardContent={card.cardContent}
                className={cn("flex-1 shadow-none", `min-w-[${card.minWidth}]`)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Complex Card Examples (Mapped) */}
      {complexCardLayoutExamples.map((layout, layoutIndex) => (
        <div key={layout.id} className={layoutIndex > 0 ? "pt-6 border-t" : ""}> {/* Add separator for second complex example */} 
          <h3 className="text-lg font-medium mb-2">{layout.title}</h3>
          <div className="flex flex-wrap gap-6 p-4 border rounded">
            {/* Create an array of specified length to map over */}
            {Array.from({ length: layout.count }).map((_, cardIndex) => (
              <CardV1 
                key={`${layout.id}-card-${cardIndex}`}
                {...layout.cardProps} // Spread the common props
                // Append index to title for uniqueness
                cardTitle={`${layout.cardProps.cardTitle} (${layout.id.startsWith('2') ? 'Card'+(cardIndex+1) : 'Card'+String.fromCharCode(65 + cardIndex)})`}
                className={cn("flex-1 shadow-none", `min-w-[${layout.minWidth}]`)}
                // Pass content and footer as components
                cardContent={layout.cardProps.cardContent} 
                footer={layout.cardProps.footer}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
} 
'use client';

import React from 'react';
import { CardV1 } from '@/components/Card/v1';
import { ButtonV2 } from '@/components/Button/v2';
import { DetailRowV1 } from '@/components/DetailRow/v1';
import { CardActionFooterV1 } from '@/components/CardActionFooter/v1';
import { ArrowLeft } from 'lucide-react';

export default function CardTestingPage() {
  return (
    <>
      {/* Card V1 Basic Structure */}
      <div>
        <h3 className="text-xl font-medium border-b pb-2 mb-4">V1: Basic Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 border rounded">
          <CardV1 
            className="shadow-none"
            cardTitle="Account Summary" 
            description="Overview of your main account." 
            cardContent={<p className="text-3xl font-semibold text-green-700">$5,432.10</p>} 
            footer={
              <div className="flex justify-end w-full"> {/* Replaced RowV2 */}
                <ButtonV2 size="sm" variant="default">Details</ButtonV2>
              </div>
            }
          />
          <CardV1 cardTitle="Recent Activity" className="shadow-none">
            <ul className="text-sm space-y-1 text-gray-700"><li>+ $100.00 (Deposit)</li><li>- $25.50 (Coffee Shop)</li><li>- $12.00 (Lunch)</li></ul>
          </CardV1>
          <CardV1 cardContent={<p className="text-center text-gray-500">Content Only Card</p>} contentProps={{ className: 'py-8' }} className="shadow-none" />
        </div>
      </div>

      {/* --- Card Examples --- */}
      <div className="mt-6">
        <h3 className="text-xl font-medium border-b pb-2 mb-4">V1: Card Examples</h3>
        <div className="space-y-6 p-4 border rounded">
          {/* --- MOVED EXAMPLE: CardV1 + 4 DetailRowV1 + CardActionFooterV1 --- */}
          <CardV1 
            className="shadow-none"
            cardTitle="Multiple Accounts" 
            description="List of linked accounts"
            contentProps={{ className: 'p-0' }} // Remove padding from default content area
            cardContent={
              <div> {/* Wrapper for DetailRows */} 
                <DetailRowV1 
                  primaryText="Primary Checking" 
                  secondaryText="**** 1234" 
                  actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} 
                  className="px-6 py-3" // Add padding back to rows
                />
                <DetailRowV1 
                  primaryText="Savings Account" 
                  secondaryText="**** 5678" 
                  actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} 
                  className="border-t border-border px-6 py-3"
                />
                <DetailRowV1 
                  primaryText="Credit Card" 
                  secondaryText="**** 9900 - Due Aug 15" 
                  actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} 
                  className="border-t border-border px-6 py-3"
                />
                <DetailRowV1 
                  primaryText="Investment Portfolio" 
                  secondaryText="**** 4321" 
                  actionContent={<span className="text-sm font-medium text-blue-600">$115,300.75</span>} 
                  className="border-t border-border px-6 py-3"
                />
              </div>
            }
            footer={ // Use CardActionFooterV1
              <CardActionFooterV1 
                secondaryAction={<ButtonV2 variant="outline">Manage Accounts</ButtonV2>} 
                primaryAction={<ButtonV2 variant="default" size="default">Transfer Funds</ButtonV2>}
              />
            }
          />

          {/* --- NEW EXAMPLE: CardV1 + 3 DetailRowV1 (Multiple Buttons) --- */}
          <CardV1
            className="shadow-none"
            cardTitle="Multiple Actions"
            description="Rows with multiple button actions"
            contentProps={{ className: 'p-0' }}
            cardContent={
              <div>
                <DetailRowV1 
                  primaryText="User Preferences"
                  secondaryText="Notification and display settings"
                  actionContent={
                    <div className="flex items-center gap-2">
                      <ButtonV2 variant="ghost">Edit</ButtonV2> 
                      <ButtonV2 variant="default" size="sm">Save</ButtonV2>
                    </div>
                  }
                  className="px-6 py-3"
                />
                <DetailRowV1 
                  primaryText="Billing Information"
                  secondaryText="Update payment method"
                  actionContent={
                    <div className="flex items-center gap-2">
                      <ButtonV2 variant="outline">View History</ButtonV2> 
                      <ButtonV2 variant="default" size="sm">Update</ButtonV2>
                    </div>
                  }
                  className="border-t border-border px-6 py-3"
                />
                <DetailRowV1 
                  primaryText="Security Settings"
                  secondaryText="Manage password and 2FA"
                  actionContent={
                    <div className="flex items-center gap-2">
                      <ButtonV2 variant="ghost">Activity Log</ButtonV2> 
                      <ButtonV2 variant="default" size="sm">Manage</ButtonV2>
                    </div>
                  }
                  className="border-t border-border px-6 py-3"
                />
              </div>
            }
            // No footer needed for this example
          />

          {/* --- NEW EXAMPLE: Conversation Card (Right Aligned Title) --- */}
          <CardV1
            className="shadow-none"
            cardTitle={
              <div className="flex flex-col items-end text-right"> {/* Right align container */} 
                <div className="flex items-center gap-2"> {/* Flex container for icon + text */} 
                   <ArrowLeft className="size-4 text-muted-foreground" /> {/* Added return icon */} 
                  <span className="text-lg font-semibold">User Intent</span>
                </div>
                <span className="text-sm text-muted-foreground">Optional clarification subtext</span>
              </div>
            }
            cardContent={
              <div>
                <p className="text-sm mb-4">
                  This is the main content area where the primary information or prompt would go.
                </p>
                <DetailRowV1 
                  primaryText="Primary Checking" 
                  secondaryText="**** 1234" 
                  actionContent={<span className="text-sm font-medium text-green-700">$10,543.21</span>} 
                  className="border-t border-border pt-3 mt-3" // Add separator and spacing
                />
                <DetailRowV1 
                  primaryText="Savings Account" 
                  secondaryText="**** 5678" 
                  actionContent={<span className="text-sm font-medium text-foreground">$25,801.50</span>} 
                  className="border-t border-border pt-3" // Top border only
                />
                <DetailRowV1 
                  primaryText="Credit Card" 
                  secondaryText="**** 9900" 
                  actionContent={<span className="text-sm font-medium text-red-600">-$1,234.56</span>} 
                  className="border-t border-border pt-3" // Top border only
                />
              </div>
            }
            footer={
              <CardActionFooterV1 
                secondaryAction={<ButtonV2 variant="conversational" fill="outline" size="sm">Decline</ButtonV2>} 
                primaryAction={<ButtonV2 variant="conversational" fill="solid" size="sm">Accept</ButtonV2>}
              />
            }
          />
        </div>
      </div>
    </>
  );
} 
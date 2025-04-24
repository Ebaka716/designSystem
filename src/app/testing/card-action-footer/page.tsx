'use client';

import React from 'react';
import { CardActionFooterV1 } from "@/components/CardActionFooter/v1"; 
import { CardV1 } from '@/components/Card/v1';
import { ButtonV2 } from '@/components/Button/v2';
import { Copy, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';

export default function CardActionFooterTestingPage() {
  // --- Card Action Footer Data Array ---
  // SPLIT into Standard and Conversational
  const standardCardActionFooterExamples = [
    {
      id: 'primary-secondary',
      title: 'Save Changes?',
      content: <p className="text-sm text-muted-foreground">You have unsaved changes.</p>,
      primaryAction: <ButtonV2 variant="default" size="default">Save</ButtonV2>,
      secondaryAction: <ButtonV2 variant="outline">Cancel</ButtonV2>,
    },
    {
      id: 'primary-only',
      title: 'Confirm Action',
      content: <p className="text-sm text-muted-foreground">Are you sure you want to proceed?</p>,
      primaryAction: <ButtonV2 variant="default" size="default">Confirm</ButtonV2>,
      secondaryAction: null,
    },
    {
      id: 'secondary-only',
      title: 'Information',
      content: <p className="text-sm text-muted-foreground">This action cannot be undone.</p>,
      primaryAction: null,
      secondaryAction: <ButtonV2 variant="ghost">Dismiss</ButtonV2>,
    },
  ];

  const conversationalCardActionFooterExamples = [
    {
      id: 'convo-ps',
      title: 'Engage?',
      content: <p className="text-sm text-muted-foreground">Start a conversation?</p>,
      primaryAction: <ButtonV2 variant="conversational" fill="solid" size="default">Start Now</ButtonV2>,
      secondaryAction: <ButtonV2 variant="conversational" fill="outline" size="default">Maybe Later</ButtonV2>,
    },
    {
      id: 'convo-p-only',
      title: 'Submit Feedback',
      content: <p className="text-sm text-muted-foreground">Send your thoughts.</p>,
      primaryAction: <ButtonV2 variant="conversational" fill="solid" size="default">Send</ButtonV2>,
      secondaryAction: null,
    },
    {
      id: 'convo-s-only',
      title: 'Reminder Set',
      content: <p className="text-sm text-muted-foreground">We&apos;ll notify you later.</p>, // Escaped apostrophe
      primaryAction: null,
      secondaryAction: <ButtonV2 variant="conversational" fill="ghost" size="default">Dismiss</ButtonV2>,
    },
  ];

    // --- Quick Action Footer Button Data ---
  const quickActionButtons = [
    { id: 'copy', label: 'Copy', icon: Copy },
    { id: 'like', label: 'Like', icon: ThumbsUp },
    { id: 'dislike', label: 'Dislike', icon: ThumbsDown },
    { id: 'share', label: 'Share', icon: Share2 },
  ];

  return (
    <>
      {/* Standard Primary/Secondary Examples (Mapped) */}
      <div>
        <h3 className="text-lg font-medium mb-2">Standard Button Footer Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 border rounded"> {/* Adjusted grid */}
          {standardCardActionFooterExamples.map((example) => (
            <CardV1
              key={example.id}
              cardTitle={example.title}
              cardContent={example.content}
              footer={
                <CardActionFooterV1 
                  primaryAction={example.primaryAction} 
                  secondaryAction={example.secondaryAction} 
                />
              }
              className="shadow-none"
            />
          ))}
        </div>
      </div>

      {/* Conversational Button Examples (Mapped) */}
      <div>
        <h3 className="text-lg font-medium mb-2">Conversational Button Footer Examples</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 border rounded"> {/* Adjusted grid */}
          {conversationalCardActionFooterExamples.map((example) => (
            <CardV1
              key={example.id}
              cardTitle={example.title}
              cardContent={example.content}
              footer={
                <CardActionFooterV1 
                  primaryAction={example.primaryAction} 
                  secondaryAction={example.secondaryAction} 
                />
              }
              className="shadow-none"
            />
          ))}
        </div>
      </div>

      {/* Quick Actions Footer Example */}
      <div>
        <h3 className="text-lg font-medium mb-2">Quick Actions Footer Example</h3>
        <div className="p-4 border rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
          {/* Example 1: Quick Actions Only */}
          <CardV1
            className="shadow-none"
            cardTitle="Generated Content (Quick Actions Only)"
            cardContent={
              <p className="text-sm text-muted-foreground">
                This card demonstrates only the quick actions footer.
              </p>
            }
            footerProps={{ className: 'flex flex-col p-0' }}
            footer={
              <>
                <hr className="border-border w-full" />
                <div className="w-full pt-3 px-3 mt-3 flex justify-end space-x-1">
                  {quickActionButtons.map(btn => (
                    <ButtonV2 
                      key={btn.id} 
                      variant="ghost" 
                      size="icon" 
                      aria-label={btn.label}
                    >
                      <btn.icon className="size-4" />
                    </ButtonV2>
                  ))}
                </div>
              </>
            }
          />
        </div>
      </div>
    </>
  );
} 
import React from 'react';
import { CardV1 } from '@/components/Card/v1';
import { Separator } from '@/components/ui/separator';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanyProfileCardV1Props {
  sector: string;
  industry: string;
  location: string;
  description: string;
  website: string;
  className?: string;
}

// Helper component for key-value rows with link icon
const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-1">
    <span className="text-muted-foreground">{label}</span>
    <a href="#" className="flex items-center gap-1 hover:underline" target="_blank" rel="noopener noreferrer">
      {value}
      <ExternalLink className="size-3.5 text-muted-foreground" />
    </a>
  </div>
);

const CompanyProfileCardV1: React.FC<CompanyProfileCardV1Props> = ({
  sector,
  industry,
  location,
  description,
  website,
  className,
}) => {
  return (
    <CardV1 cardTitle="Company profile" className={cn("max-w-2xl", className)}>
      <div className="px-6 pb-4"> {/* Add padding manually as CardContent might add too much */}
        <div className="space-y-1 mb-4">
          <InfoRow label="Sector" value={sector} />
          <InfoRow label="Industry" value={industry} />
          <InfoRow label="Company Location" value={location} />
        </div>

        <Separator />

        <div className="mt-4 mb-4 max-h-40 overflow-y-auto pr-2 text-sm text-muted-foreground scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {description}
        </div>

        <Separator />

        <div className="mt-4">
          <a href={`https://${website}`} className="flex items-center gap-1 text-sm hover:underline" target="_blank" rel="noopener noreferrer">
            {website}
            <ExternalLink className="size-3.5 text-muted-foreground" />
          </a>
        </div>
      </div>
      {/* CardV1 automatically handles footer if needed */}
    </CardV1>
  );
};

export default CompanyProfileCardV1; 
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // Assuming card is in ui, adjust if needed
import DataRow from '@/components/dataRow'; // Use default import
import Indicator from '@/components/indicator'; // Use default import

export const ViewAssembly: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>View assembly</CardTitle>
        <CardDescription>
          Pictorial representation of the view assembly equation.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2"> {/* Added spacing for data rows */}
        <DataRow label="Word count" value="N/A" />
        <DataRow label="Confidence" value={<Indicator level="Medium" />} />
        <DataRow label="Task" value="N/A" />
        <DataRow label="Personalization" value="N/A" />
        <DataRow label="Content type" value="N/A" />
      </CardContent>
    </Card>
  );
}; 
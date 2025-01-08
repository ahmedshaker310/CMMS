import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { exportToExcel } from '../lib/excel';

interface ExportButtonProps {
  data: any[];
  filename: string;
}

export function ExportButton({ data, filename }: ExportButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={() => exportToExcel(data, filename)}
      className="flex items-center gap-2"
    >
      <Download className="w-4 h-4" />
      Export to Excel
    </Button>
  );
}
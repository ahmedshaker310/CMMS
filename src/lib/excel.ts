import * as XLSX from 'xlsx';
import { format } from 'date-fns';

export function exportToExcel(data: any[], filename: string) {
  const worksheet = XLSX.utils.json_to_sheet(data.map(item => {
    const flatItem: any = {};
    
    // Flatten nested objects
    Object.entries(item).forEach(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([nestedKey, nestedValue]) => {
          flatItem[`${key}_${nestedKey}`] = nestedValue;
        });
      } else if (value instanceof Date || (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/))) {
        flatItem[key] = format(new Date(value), 'PPP');
      } else {
        flatItem[key] = value;
      }
    });
    
    return flatItem;
  }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
  
  // Generate file name with date
  const date = format(new Date(), 'yyyy-MM-dd');
  const fullFilename = `${filename}_${date}.xlsx`;
  
  XLSX.writeFile(workbook, fullFilename);
}
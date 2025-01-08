import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { DataTable } from './DataTable';
import { format } from 'date-fns';

export function ServiceSheets() {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    fetchSheets();
  }, []);

  async function fetchSheets() {
    const { data } = await supabase
      .from('service_sheets')
      .select(`
        *,
        equipment:equipment_id (name),
        maintenance:maintenance_id (type, completed_date)
      `)
      .order('created_at', { ascending: false });
    
    if (data) setSheets(data);
  }

  const columns = [
    {
      accessorKey: 'equipment.name',
      header: 'Equipment',
    },
    {
      accessorKey: 'maintenance.type',
      header: 'Maintenance Type',
    },
    {
      accessorKey: 'created_at',
      header: 'Date',
      cell: ({ row }) => format(new Date(row.original.created_at), 'PPP'),
    },
    {
      accessorKey: 'document_url',
      header: 'Document',
      cell: ({ row }) => row.original.document_url && (
        <a 
          href={row.original.document_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View
        </a>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Service Documentation</h2>
        <Button>Upload Document</Button>
      </div>
      <DataTable columns={columns} data={sheets} />
    </div>
  );
}
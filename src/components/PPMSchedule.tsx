import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { DataTable } from './DataTable';
import { format } from 'date-fns';
import { ExportButton } from './ExportButton';

export function PPMSchedule() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSchedules();
  }, []);

  async function fetchSchedules() {
    const { data } = await supabase
      .from('ppm_schedules')
      .select(`
        *,
        equipment:equipment_id (name)
      `)
      .order('next_due_date');
    
    if (data) setSchedules(data);
  }

  const columns = [
    {
      accessorKey: 'equipment.name',
      header: 'Equipment',
    },
    {
      accessorKey: 'frequency',
      header: 'Frequency',
    },
    {
      accessorKey: 'next_due_date',
      header: 'Next Due Date',
      cell: ({ row }) => format(new Date(row.original.next_due_date), 'PPP'),
    },
    {
      accessorKey: 'last_completed',
      header: 'Last Completed',
      cell: ({ row }) => row.original.last_completed 
        ? format(new Date(row.original.last_completed), 'PPP')
        : 'Never',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">PPM Schedule</h2>
        <div className="flex gap-4">
          <ExportButton data={schedules} filename="ppm_schedule" />
          <Button>Add Schedule</Button>
        </div>
      </div>
      <DataTable columns={columns} data={schedules} />
    </div>
  );
}
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { DataTable } from '../components/DataTable';
import { AddMaintenanceDialog } from '../components/AddMaintenanceDialog';
import { ExportButton } from '../components/ExportButton';

export function Maintenance() {
  const [maintenance, setMaintenance] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchMaintenance();
  }, []);

  async function fetchMaintenance() {
    const { data } = await supabase
      .from('maintenance')
      .select(`
        *,
        equipment:equipment_id (name)
      `)
      .order('due_date');
    
    if (data) setMaintenance(data);
  }

  const columns = [
    {
      accessorKey: 'equipment.name',
      header: 'Equipment',
    },
    {
      accessorKey: 'type',
      header: 'Maintenance Type',
    },
    {
      accessorKey: 'due_date',
      header: 'Due Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Maintenance Schedule</h1>
        <div className="flex gap-4">
          <ExportButton data={maintenance} filename="maintenance_records" />
          <Button onClick={() => setIsDialogOpen(true)}>
            Schedule Maintenance
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={maintenance} />

      <AddMaintenanceDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={fetchMaintenance}
      />
    </div>
  );
}
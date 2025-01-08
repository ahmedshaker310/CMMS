import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { DataTable } from '../components/DataTable';
import { AddEquipmentDialog } from '../components/AddEquipmentDialog';
import { ExportButton } from '../components/ExportButton';

export function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchEquipment();
  }, []);

  async function fetchEquipment() {
    const { data } = await supabase
      .from('equipment')
      .select('*')
      .order('name');
    
    if (data) setEquipment(data);
  }

  const columns = [
    {
      accessorKey: 'name',
      header: 'Equipment Name',
    },
    {
      accessorKey: 'model',
      header: 'Model',
    },
    {
      accessorKey: 'serial_number',
      header: 'Serial Number',
    },
    {
      accessorKey: 'location',
      header: 'Location',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Equipment</h1>
        <div className="flex gap-4">
          <ExportButton data={equipment} filename="equipment_inventory" />
          <Button onClick={() => setIsDialogOpen(true)}>
            Add Equipment
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={equipment} />

      <AddEquipmentDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSuccess={fetchEquipment}
      />
    </div>
  );
}
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/card';

export function Dashboard() {
  const [stats, setStats] = useState({
    totalEquipment: 0,
    pendingMaintenance: 0,
    completedMaintenance: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const { data: equipment } = await supabase
        .from('equipment')
        .select('count');
      
      const { data: pending } = await supabase
        .from('maintenance')
        .select('count')
        .eq('status', 'pending');

      const { data: completed } = await supabase
        .from('maintenance')
        .select('count')
        .eq('status', 'completed');

      setStats({
        totalEquipment: equipment?.[0]?.count || 0,
        pendingMaintenance: pending?.[0]?.count || 0,
        completedMaintenance: completed?.[0]?.count || 0,
      });
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Total Equipment</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalEquipment}</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Pending Maintenance</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-600">
            {stats.pendingMaintenance}
          </p>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-semibold text-lg">Completed Maintenance</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">
            {stats.completedMaintenance}
          </p>
        </Card>
      </div>
    </div>
  );
}
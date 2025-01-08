import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LanguageSwitch } from '../components/LanguageSwitch';

export function Settings() {
  const [settings, setSettings] = useState({
    facility_name: '',
    logo_url: '',
    primary_color: '#0f172a',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data } = await supabase
      .from('ui_settings')
      .select('*')
      .single();
    
    if (data) setSettings(data);
  }

  async function updateSettings(newSettings: typeof settings) {
    const { error } = await supabase
      .from('ui_settings')
      .upsert(newSettings);
    
    if (!error) {
      setSettings(newSettings);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card className="p-6">
        <form className="space-y-4">
          <div>
            <Label htmlFor="facility_name">Facility Name</Label>
            <Input
              id="facility_name"
              value={settings.facility_name}
              onChange={(e) => setSettings({
                ...settings,
                facility_name: e.target.value,
              })}
            />
          </div>

          <div>
            <Label htmlFor="logo_url">Logo URL</Label>
            <Input
              id="logo_url"
              value={settings.logo_url}
              onChange={(e) => setSettings({
                ...settings,
                logo_url: e.target.value,
              })}
            />
          </div>

          <div>
            <Label htmlFor="primary_color">Primary Color</Label>
            <Input
              id="primary_color"
              type="color"
              value={settings.primary_color}
              onChange={(e) => setSettings({
                ...settings,
                primary_color: e.target.value,
              })}
            />
          </div>

          <Button onClick={() => updateSettings(settings)}>
            Save Settings
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Language</h2>
        <LanguageSwitch />
      </Card>
    </div>
  );
}
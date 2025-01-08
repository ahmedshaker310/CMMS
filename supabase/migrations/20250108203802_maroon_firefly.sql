/*
  # Add PPM and Additional Features

  1. New Tables
    - `ppm_schedules`: Stores preventive maintenance schedules
    - `service_sheets`: Stores service documentation and images
    - `ui_settings`: Stores UI customization settings
    - `translations`: Stores multilingual content

  2. Security
    - Enable RLS on all new tables
    - Add policies for role-based access
*/

-- PPM Schedules
CREATE TABLE IF NOT EXISTS ppm_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id uuid REFERENCES equipment(id),
  frequency text NOT NULL,
  next_due_date timestamptz NOT NULL,
  last_completed timestamptz,
  notification_days_before integer DEFAULT 7,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Service Sheets
CREATE TABLE IF NOT EXISTS service_sheets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id uuid REFERENCES equipment(id),
  maintenance_id uuid REFERENCES maintenance(id),
  document_url text,
  notes text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- UI Settings
CREATE TABLE IF NOT EXISTS ui_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_name text NOT NULL,
  logo_url text,
  primary_color text DEFAULT '#0f172a',
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Translations
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  en text NOT NULL,
  ar text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ppm_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ui_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow authenticated users to read ppm_schedules"
  ON ppm_schedules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage ppm_schedules"
  ON ppm_schedules FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read service_sheets"
  ON service_sheets FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to manage service_sheets"
  ON service_sheets FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read ui_settings"
  ON ui_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read translations"
  ON translations FOR SELECT
  TO authenticated
  USING (true);
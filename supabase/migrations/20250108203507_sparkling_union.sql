/*
  # Initial CMMS Schema Setup

  1. New Tables
    - `equipment`
      - Basic equipment information including name, model, serial number, etc.
    - `maintenance`
      - Maintenance records linked to equipment
    - `reports`
      - Generated reports and analytics

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Equipment Table
CREATE TABLE IF NOT EXISTS equipment (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  model text,
  serial_number text,
  manufacturer text,
  location text,
  purchase_date date,
  warranty_expiry date,
  status text DEFAULT 'active',
  notes text,
  last_maintenance_date timestamptz,
  next_maintenance_date timestamptz
);

-- Maintenance Table
CREATE TABLE IF NOT EXISTS maintenance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  equipment_id uuid REFERENCES equipment(id),
  type text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  completed_date timestamptz,
  status text DEFAULT 'pending',
  performed_by text,
  notes text,
  cost decimal(10,2)
);

-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  type text NOT NULL,
  content jsonb,
  generated_by uuid REFERENCES auth.users(id),
  date_range_start timestamptz,
  date_range_end timestamptz
);

-- Enable Row Level Security
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read equipment"
  ON equipment FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert equipment"
  ON equipment FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update equipment"
  ON equipment FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read maintenance"
  ON maintenance FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert maintenance"
  ON maintenance FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update maintenance"
  ON maintenance FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read reports"
  ON reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (true);
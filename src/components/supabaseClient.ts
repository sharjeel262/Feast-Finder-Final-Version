// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tmspexvczupwnvsvxoze.supabase.co';  // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtc3BleHZjenVwd252c3Z4b3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5MDA5ODEsImV4cCI6MjA0OTQ3Njk4MX0.YL6O9uF-w5rZ2__3JeJziH9uPBJ7l_sfGCLFym4tza0';  // Replace with your Supabase anon key

export const supabase = createClient(supabaseUrl, supabaseKey);

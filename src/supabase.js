import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ruszzrwvsuvklexxbijo.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1c3p6cnd2c3V2a2xleHhiaWpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxOTUxOTQsImV4cCI6MjA3OTc3MTE5NH0.XY5y6ECcai8TcHXuDngruzyckHvGGdEO4ECl7xtGjfE';

if (!supabaseKey) {
    console.error('VITE_SUPABASE_KEY is required');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase, supabaseUrl, supabaseKey };
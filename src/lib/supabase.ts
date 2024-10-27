import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://biyhzqxtfovwvhttpaak.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpeWh6cXh0Zm92d3ZodHRwYWFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5OTY1NjYsImV4cCI6MjA0NTU3MjU2Nn0.TAFaBq9Hp1XkN0mRy3cb6fTXhlSuDyDa1i5KVltB0EM';

export const supabase = createClient(supabaseUrl, supabaseKey);
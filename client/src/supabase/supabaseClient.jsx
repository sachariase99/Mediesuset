// src/supabase/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xolijibfaoscceamabvd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvbGlqaWJmYW9zY2NlYW1hYnZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMjk1NjAsImV4cCI6MjAzODYwNTU2MH0.1XS-HXuckL3WvyH-F4abo9omSHWcOGy00OMjnN-x800';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
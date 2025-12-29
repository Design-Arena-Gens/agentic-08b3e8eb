import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  requirement: string;
  budget?: string;
  deadline?: string;
  language: string;
  status: 'new' | 'contacted' | 'converted' | 'lost';
};

export type ChatMessage = {
  id: string;
  created_at: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  language: string;
};

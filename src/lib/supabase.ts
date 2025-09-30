import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgzlliwadflsvsmvynuq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnemxsaXdhZGZsc3ZzbXZ5bnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2Nzk1NTMsImV4cCI6MjA3NDI1NTU1M30.gB8GNenMMgXZXk3hMfO-eBhmYHtQKFwoKcLq9ohwvgo';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper functions for database operations
export const insertRecentPlayer = async (playerData: {
  player_id: string;
  player_name: string;
  team: string;
  league: string;
}) => {
  try {
    const { data, error } = await supabase
      .from('players_recent')
      .upsert({
        ...playerData,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      }, {
        onConflict: 'user_id,player_id'
      });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error inserting recent player:', error);
    return null;
  }
};

export const getRecentPlayers = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('players_recent')
      .select('*')
      .order('viewed_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recent players:', error);
    return [];
  }
};

export const insertProp = async (propData: {
  sport: string;
  league: string;
  player_name: string;
  market: string;
  line: number;
  side: string;
  odds?: number;
  notes?: string;
  is_mock?: boolean;
}) => {
  try {
    const { data, error } = await supabase
      .from('props')
      .insert({
        ...propData,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error inserting prop:', error);
    return null;
  }
};

export const getRecentProps = async (limit = 5) => {
  try {
    const { data, error } = await supabase
      .from('props')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching recent props:', error);
    return [];
  }
};
// React Query hook to read cached odds from Supabase

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface CachedOdd {
  id: number;
  player: string;
  team?: string;
  market: string;
  line: number;
  odds_american?: number;
  book?: string;
  game_date?: string;
  opponent?: string;
  updated_at: string;
}

export function usePlayerOdds(player: string, market?: string) {
  return useQuery({
    queryKey: ["playerOdds", player, market],
    queryFn: async () => {
      let query = supabase
        .from("odds_props")
        .select("*")
        .eq("player", player);
      
      if (market) {
        query = query.eq("market", market);
      }
      
      const { data, error } = await query
        .order("updated_at", { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return (data ?? []) as CachedOdd[];
    },
    enabled: !!player,
    staleTime: 60_000, // Cache for 1 minute
  });
}

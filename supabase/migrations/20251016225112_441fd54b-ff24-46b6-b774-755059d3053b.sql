-- Create odds_props cache table for external sportsbook data
-- This table stores normalized odds from various providers (DK, FD, etc.)
-- Populated by fetch-odds Edge Function

create table if not exists public.odds_props (
  id bigserial primary key,
  player text not null,
  team text,
  market text not null,            -- "PTS","REB","AST","3PM","PRA","PR","RA","PA"
  line numeric not null,
  odds_american int,
  book text,
  game_date date,
  opponent text,
  updated_at timestamptz not null default now(),
  
  -- Ensure unique constraint per player/market/date/book combination
  unique (player, market, game_date, book)
);

-- Indexes for fast lookups
create index if not exists idx_odds_player_market on public.odds_props(player, market);
create index if not exists idx_odds_updated_at on public.odds_props(updated_at desc);
create index if not exists idx_odds_game_date on public.odds_props(game_date desc);

-- RLS: Enable but allow public reads (writes are service-role only via Edge Function)
alter table public.odds_props enable row level security;

-- Allow anyone to read odds (public data)
create policy "Anyone can view odds"
  on public.odds_props
  for select
  using (true);

-- Comment for context
comment on table public.odds_props is 'Cache table for player prop odds from external providers. Updated by fetch-odds Edge Function.';
# fetch-odds Edge Function

Fetches player prop odds from an external provider, normalizes the data, and caches it in the `odds_props` table.

## Environment Variables

Set these secrets in your Supabase project:

```bash
# Placeholder for future real provider integration
ODDS_API_BASE=https://api.the-odds-api.com  # or your chosen provider
ODDS_API_KEY=your_api_key_here
```

To set secrets via Supabase CLI:
```bash
supabase secrets set ODDS_API_BASE=https://api.the-odds-api.com
supabase secrets set ODDS_API_KEY=your_key
```

Or set them in the Supabase Dashboard under Settings > Edge Functions.

## Usage

Call from client code:
```typescript
const { data } = await supabase.functions.invoke("fetch-odds", {
  body: {
    players: ["LaMelo Ball", "Jayson Tatum"],
    markets: ["PTS", "REB"],
    date: "2025-10-16"  // optional, defaults to today
  }
});
// Returns: { count: number, upserted: number, errors?: string[] }
```

## TODO

- [ ] Replace mock data with real provider API calls
- [ ] Add rate limiting and backoff logic
- [ ] Set up daily cron job to pre-warm the cache
- [ ] Add validation for incoming parameters

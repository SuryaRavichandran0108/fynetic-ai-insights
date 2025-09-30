-- Create players_recent table for caching user's recently viewed players
CREATE TABLE public.players_recent (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  player_id TEXT NOT NULL,
  player_name TEXT NOT NULL,
  team TEXT NOT NULL,
  league TEXT NOT NULL,
  viewed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.players_recent ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own recent players
CREATE POLICY "Users can view their own recent players" 
ON public.players_recent 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own recent players" 
ON public.players_recent 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recent players" 
ON public.players_recent 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own recent players" 
ON public.players_recent 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create props table for user-built props
CREATE TABLE public.props (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  sport TEXT NOT NULL,
  league TEXT NOT NULL,
  player_id TEXT,
  player_name TEXT NOT NULL,
  market TEXT NOT NULL,
  line NUMERIC NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('over', 'under')),
  odds NUMERIC,
  notes TEXT,
  is_mock BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.props ENABLE ROW LEVEL SECURITY;

-- Create policies for props
CREATE POLICY "Users can view their own props" 
ON public.props 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own props" 
ON public.props 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own props" 
ON public.props 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own props" 
ON public.props 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create pins table for user-starred items
CREATE TABLE public.pins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('player', 'prop')),
  entity_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.pins ENABLE ROW LEVEL SECURITY;

-- Create policies for pins
CREATE POLICY "Users can view their own pins" 
ON public.pins 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pins" 
ON public.pins 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pins" 
ON public.pins 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create messages table for chat history (optional)
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content JSONB NOT NULL,
  confidence NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies for messages
CREATE POLICY "Users can view their own messages" 
ON public.messages 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own messages" 
ON public.messages 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates on props
CREATE TRIGGER update_props_updated_at
  BEFORE UPDATE ON public.props
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_players_recent_user_id_viewed_at ON public.players_recent(user_id, viewed_at DESC);
CREATE INDEX idx_props_user_id_created_at ON public.props(user_id, created_at DESC);
CREATE INDEX idx_pins_user_id_entity_type ON public.pins(user_id, entity_type);
CREATE INDEX idx_messages_user_id_created_at ON public.messages(user_id, created_at DESC);
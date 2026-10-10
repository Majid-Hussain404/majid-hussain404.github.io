-- =========================================================================
-- Supabase Schema & Row Level Security (RLS) Setup for Majid's Portfolio
-- =========================================================================

-- 1. Create table for portfolio visibility settings
create table if not exists public.portfolio_visibility (
  id text primary key default 'default',
  hidden_repo_ids text[] not null default '{}',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Insert initial row if not present
insert into public.portfolio_visibility (id, hidden_repo_ids)
values ('default', '{}')
on conflict (id) do nothing;

-- 3. Enable Row Level Security (RLS)
alter table public.portfolio_visibility enable row level security;

-- 4. Policy: Allow public read access to visibility settings
create policy "Allow public read access"
  on public.portfolio_visibility
  for select
  to public
  using (true);

-- 5. Policy: Allow owner update access to visibility settings
create policy "Allow owner update access"
  on public.portfolio_visibility
  for update
  to authenticated
  using (true)
  with check (true);

-- =========================================================================
-- Create table for Custom Projects (Uploaded Projects)
-- =========================================================================

create table if not exists public.portfolio_projects (
  id text primary key,
  title text not null,
  subtitle text,
  description text not null,
  gradient text,
  image text,
  link text,
  tags text[],
  is_custom boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.portfolio_projects enable row level security;

-- Public can read projects
create policy "Allow public read custom projects"
  on public.portfolio_projects
  for select
  to public
  using (true);

-- Only owner can insert/update/delete projects
create policy "Allow owner manage custom projects"
  on public.portfolio_projects
  for all
  to authenticated
  using (true);

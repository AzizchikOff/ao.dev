-- Run in Supabase SQL Editor after creating a project.
-- Public portfolio content is readable by anyone; only allowlisted authenticated admins can write.
create extension if not exists pgcrypto;

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.portfolio_admins enable row level security;
-- No client policies: this table can only be changed using a trusted server-side
-- Supabase SQL session or service role. Never put the service role key in Vite.

create or replace function public.is_portfolio_admin()
returns boolean language sql stable security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.portfolio_admins
    where user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;

create table if not exists public.portfolio_certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(title) between 1 and 200),
  issuer text not null check (length(issuer) between 1 and 150),
  issued_on date,
  certificate_code text check (length(certificate_code) <= 100),
  credential_url text check (credential_url is null or credential_url ~ '^https://'),
  file_path text check (length(file_path) <= 500),
  position integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.portfolio_certificates enable row level security;
create policy "Published certificates visible" on public.portfolio_certificates
  for select to anon, authenticated using (published or (select public.is_portfolio_admin()));
create policy "Admin insert certificates" on public.portfolio_certificates
  for insert to authenticated with check ((select public.is_portfolio_admin()));
create policy "Admin update certificates" on public.portfolio_certificates
  for update to authenticated using ((select public.is_portfolio_admin())) with check ((select public.is_portfolio_admin()));
create policy "Admin delete certificates" on public.portfolio_certificates
  for delete to authenticated using ((select public.is_portfolio_admin()));

-- Private file storage. Public frontend should use signed URLs issued by
-- an authenticated server route or publish only files approved for public access.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-certificates', 'portfolio-certificates', false, 10485760, array['application/pdf','image/jpeg','image/png'])
on conflict (id) do nothing;

create policy "Admins upload certificate files" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'portfolio-certificates' and (select public.is_portfolio_admin())
  );
create policy "Admins view certificate files" on storage.objects
  for select to authenticated using (
    bucket_id = 'portfolio-certificates' and (select public.is_portfolio_admin())
  );
create policy "Admins modify certificate files" on storage.objects
  for update to authenticated using (
    bucket_id = 'portfolio-certificates' and (select public.is_portfolio_admin())
  ) with check (
    bucket_id = 'portfolio-certificates' and (select public.is_portfolio_admin())
  );
create policy "Admins delete certificate files" on storage.objects
  for delete to authenticated using (
    bucket_id = 'portfolio-certificates' and (select public.is_portfolio_admin())
  );

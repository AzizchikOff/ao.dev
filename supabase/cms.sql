-- Apply once after schema.sql. Generic multilingual CMS content.
create table if not exists public.portfolio_content (
  section text primary key check (section in ('hero','about','skills','work','experience','playground','blog','resume','contact','footer','navbar','settings')),
  content jsonb not null default '{}'::jsonb check (jsonb_typeof(content) = 'object'),
  updated_at timestamptz not null default now()
);
alter table public.portfolio_content enable row level security;
create policy "Public content read" on public.portfolio_content for select to anon, authenticated using (true);
create policy "Admin content insert" on public.portfolio_content for insert to authenticated with check ((select public.is_portfolio_admin()));
create policy "Admin content update" on public.portfolio_content for update to authenticated using ((select public.is_portfolio_admin())) with check ((select public.is_portfolio_admin()));
create policy "Admin content delete" on public.portfolio_content for delete to authenticated using ((select public.is_portfolio_admin()));
-- Allow downloads only for files explicitly associated with published certificates.
create policy "Published certificate downloads" on storage.objects for select to anon, authenticated using (
 bucket_id = 'portfolio-certificates' and exists (
 select 1 from public.portfolio_certificates c where c.published and c.file_path = storage.objects.name
 )
);

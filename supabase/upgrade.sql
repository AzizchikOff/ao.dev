-- Run after schema.sql and cms.sql.
begin;
drop policy if exists "Public published certificates" on public.portfolio_certificates;
create policy "Public published certificates" on public.portfolio_certificates for select to anon using (published);
-- The existing combined read policy may evaluate this helper for anonymous users.
-- The helper only checks the caller's own auth.uid(), which is null for anonymous requests.
grant execute on function public.is_portfolio_admin() to anon;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('portfolio-media','portfolio-media',true,10485760,array['image/jpeg','image/png','image/webp','application/pdf']) on conflict(id) do nothing;
drop policy if exists "Portfolio media admin read" on storage.objects;
create policy "Portfolio media admin read" on storage.objects for select to authenticated using(bucket_id='portfolio-media' and (select public.is_portfolio_admin()));
drop policy if exists "Portfolio media admin upload" on storage.objects;
create policy "Portfolio media admin upload" on storage.objects for insert to authenticated with check(bucket_id='portfolio-media' and (select public.is_portfolio_admin()));
drop policy if exists "Portfolio media admin delete" on storage.objects;
create policy "Portfolio media admin delete" on storage.objects for delete to authenticated using(bucket_id='portfolio-media' and (select public.is_portfolio_admin()));


create table if not exists public.portfolio_revisions (
 id uuid primary key default gen_random_uuid(),
 section text not null,
 content jsonb not null,
 created_at timestamptz not null default now()
);
alter table public.portfolio_revisions enable row level security;
drop policy if exists "Admin revision read" on public.portfolio_revisions;
create policy "Admin revision read" on public.portfolio_revisions for select to authenticated using ((select public.is_portfolio_admin()));
create or replace function public.archive_portfolio_content() returns trigger language plpgsql security definer set search_path='' as $$
begin
 if tg_op='DELETE' or old.content is distinct from new.content then
 insert into public.portfolio_revisions(section,content) values(old.section,old.content);
 end if;
 if tg_op='DELETE' then return old; end if;
 return new;
end;
$$;
revoke all on function public.archive_portfolio_content() from public;
drop trigger if exists portfolio_content_archive on public.portfolio_content;
create trigger portfolio_content_archive before update or delete on public.portfolio_content for each row execute function public.archive_portfolio_content();


create table if not exists public.portfolio_views (
 day date primary key,
 views bigint not null default 0
);
alter table public.portfolio_views enable row level security;
drop policy if exists "Admin views read" on public.portfolio_views;
create policy "Admin views read" on public.portfolio_views for select to authenticated using ((select public.is_portfolio_admin()));
create or replace function public.record_portfolio_view() returns void language sql security definer set search_path='' as $$
 insert into public.portfolio_views(day,views) values ((now() at time zone 'UTC')::date,1)
 on conflict(day) do update set views=portfolio_views.views+1;
$$;
revoke all on function public.record_portfolio_view() from public;
grant execute on function public.record_portfolio_view() to anon,authenticated;

commit;

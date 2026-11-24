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

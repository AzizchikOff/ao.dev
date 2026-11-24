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

begin;
drop policy if exists "Public published certificates" on public.portfolio_certificates;
create policy "Public published certificates" on public.portfolio_certificates for select to anon using (published);
-- The existing combined read policy may evaluate this helper for anonymous users.
-- The helper only checks the caller's own auth.uid(), which is null for anonymous requests.
grant execute on function public.is_portfolio_admin() to anon;
commit;

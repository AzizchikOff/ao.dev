insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('portfolio-media','portfolio-media',true,10485760,array['image/jpeg','image/png','image/webp','application/pdf']) on conflict(id) do nothing;
drop policy if exists "Portfolio media admin read" on storage.objects;
create policy "Portfolio media admin read" on storage.objects for select to authenticated using(bucket_id='portfolio-media' and (select public.is_portfolio_admin()));
drop policy if exists "Portfolio media admin upload" on storage.objects;
create policy "Portfolio media admin upload" on storage.objects for insert to authenticated with check(bucket_id='portfolio-media' and (select public.is_portfolio_admin()));
drop policy if exists "Portfolio media admin delete" on storage.objects;
create policy "Portfolio media admin delete" on storage.objects for delete to authenticated using(bucket_id='portfolio-media' and (select public.is_portfolio_admin()));

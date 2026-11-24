# Portfolio admin — secure setup

Status: database schema only. **No admin UI, login or live database is connected yet.**

1. Create a Supabase project under your own account.
2. In SQL Editor, review and execute `supabase/schema.sql`.
3. Enable email authentication and create your own administrator account.
4. Find your user UUID in Authentication > Users, then run in SQL Editor:
   `insert into public.portfolio_admins (user_id) values ('YOUR-AUTH-USER-UUID');`
5. Only add the **project URL** and **publishable/anon key** to frontend environment variables; never use the service-role key in a browser or GitHub.
6. Before connecting the editor, verify non-admin users cannot insert, update, delete or upload; verify admin access and test logout.
7. Certificates remain unpublished by default; verify uploaded documents and decide whether they should be public before publishing.

The four current certificate cards are static. The uploaded PDFs have **not** been copied into the repository or Supabase Storage. Certificate codes come from user-supplied documents; independent issuer verification is still pending.

For public downloads, either publish selected PDFs deliberately to a public bucket or use a server-side signed-URL endpoint with appropriate access checks. The private bucket in the schema is not publicly downloadable.

Do not deploy an admin editing interface before its Supabase Auth and row-level security integration is tested.

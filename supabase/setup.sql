-- ============================================================================
-- SKEMA SUPABASE & STORAGE — PORTAL KEMENAG KABUPATEN WONOSOBO
-- Jalankan seluruh skrip ini di: Supabase Dashboard -> SQL Editor -> New Query
-- ============================================================================

-- 1. Tabel utama penyimpanan snapshot data portal (units, seksi, social, kepalaKantor)
create table if not exists public.portal_data (
  id text primary key default 'main',
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

-- 2. Berikan hak akses tabel ke role Data API (anon & authenticated)
grant usage on schema public to anon, authenticated;
grant select on table public.portal_data to anon, authenticated;
grant insert, update, delete on table public.portal_data to authenticated;

-- 3. Aktifkan Row Level Security (RLS)
alter table public.portal_data enable row level security;

-- Kebijakan: Semua pengunjung (anon & authenticated) boleh membaca data portal publik
drop policy if exists "portal_data_select_public" on public.portal_data;
create policy "portal_data_select_public"
  on public.portal_data
  for select
  to anon, authenticated
  using (true);

-- Kebijakan: Hanya admin yang terautentikasi lewat Supabase Auth yang boleh menambah data
drop policy if exists "portal_data_insert_authenticated" on public.portal_data;
create policy "portal_data_insert_authenticated"
  on public.portal_data
  for insert
  to authenticated
  with check ((select auth.uid()) is not null);

-- Kebijakan: Hanya admin yang terautentikasi yang boleh memperbarui data
drop policy if exists "portal_data_update_authenticated" on public.portal_data;
create policy "portal_data_update_authenticated"
  on public.portal_data
  for update
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

-- Kebijakan: Hanya admin yang terautentikasi yang boleh menghapus/reset data
drop policy if exists "portal_data_delete_authenticated" on public.portal_data;
create policy "portal_data_delete_authenticated"
  on public.portal_data
  for delete
  to authenticated
  using ((select auth.uid()) is not null);

-- 4. Buat Bucket Storage "uploads" (Publik untuk dilihat pengunjung, Terproteksi untuk unggah)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'uploads',
  'uploads',
  true,
  52428800, -- 50 MB
  array[
    'image/png',
    'image/jpeg',
    'image/webp',
    'image/gif',
    'image/avif',
    'image/svg+xml',
    'application/pdf',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- 5. Kebijakan RLS Storage untuk bucket "uploads"
-- Catatan penting Supabase: Operasi upsert membutuhkan kebijakan SELECT + INSERT + UPDATE.

drop policy if exists "uploads_public_read" on storage.objects;
create policy "uploads_public_read"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'uploads');

drop policy if exists "uploads_auth_insert" on storage.objects;
create policy "uploads_auth_insert"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'uploads'
    and (select auth.uid()) is not null
  );

drop policy if exists "uploads_auth_update" on storage.objects;
create policy "uploads_auth_update"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'uploads'
    and (select auth.uid()) is not null
  )
  with check (
    bucket_id = 'uploads'
    and (select auth.uid()) is not null
  );

drop policy if exists "uploads_auth_delete" on storage.objects;
create policy "uploads_auth_delete"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'uploads'
    and (select auth.uid()) is not null
  );


-- ==========================================================
-- Rov Wood — SQL الخاص بإعداد قاعدة البيانات على Supabase
-- انسخ هذا الملف كامل والصقه في: Supabase Dashboard > SQL Editor > New Query > Run
-- ==========================================================

-- جدول الأقسام (مثل: سادة، فورمايكا، ميلامين، هاي جلوس)
create table if not exists sections (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- جدول أكواد التصميم داخل كل قسم
create table if not exists design_codes (
  id uuid primary key default gen_random_uuid(),
  section_id uuid references sections(id) on delete cascade not null,
  code_number text not null,
  thumbnail_url text not null,
  full_image_url text not null,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- تفعيل الحماية على مستوى الصفوف (Row Level Security)
alter table sections enable row level security;
alter table design_codes enable row level security;

-- السماح للجميع بالقراءة فقط (الموقع عام، أي زائر يشوف الأقسام والأكواد)
create policy "قراءة عامة للأقسام"
  on sections for select
  using (true);

create policy "قراءة عامة للأكواد"
  on design_codes for select
  using (true);

-- السماح بالإضافة/التعديل/الحذف لأي مستخدم يستخدم الـ anon key
-- (الحماية الفعلية بتبقى بكلمة سر صفحة الأدمن في الموقع نفسه)
create policy "إضافة أقسام"
  on sections for insert
  with check (true);

create policy "تعديل أقسام"
  on sections for update
  using (true);

create policy "حذف أقسام"
  on sections for delete
  using (true);

create policy "إضافة أكواد"
  on design_codes for insert
  with check (true);

create policy "تعديل أكواد"
  on design_codes for update
  using (true);

create policy "حذف أكواد"
  on design_codes for delete
  using (true);

-- ==========================================================
-- إعداد تخزين الصور (Storage)
-- لازم كمان تعمل الخطوات دي من واجهة Supabase (مش SQL):
-- 1. من القائمة الجانبية: Storage > Create a new bucket
-- 2. اسم الـ bucket: design-images
-- 3. فعّل خيار "Public bucket" (عشان الصور تظهر للزوار)
-- 4. احفظ
-- ==========================================================

-- سياسات الوصول لتخزين الصور (شغّلها بعد إنشاء الـ bucket)
create policy "قراءة عامة لصور التصميم"
  on storage.objects for select
  using (bucket_id = 'design-images');

create policy "رفع صور التصميم"
  on storage.objects for insert
  with check (bucket_id = 'design-images');

create policy "حذف صور التصميم"
  on storage.objects for delete
  using (bucket_id = 'design-images');

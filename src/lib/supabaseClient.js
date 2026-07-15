import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'إعدادات Supabase ناقصة. تأكد من إضافة VITE_SUPABASE_URL و VITE_SUPABASE_ANON_KEY في ملف .env أو في إعدادات Netlify.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

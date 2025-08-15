import { supabase } from './config'

const BUCKET = 'images'

export function getImageUrl(path) {
  if (!path) return ''
  // If already absolute URL, return as is
  if (/^https?:\/\//i.test(path)) return path
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data?.publicUrl || ''
}

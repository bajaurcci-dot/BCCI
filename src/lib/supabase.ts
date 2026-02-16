import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'
const isBrowser = typeof window !== 'undefined'

// Aggressive polyfill for SSR safety
if (!isBrowser) {
  console.log('[Supabase Server] Initial global.localStorage type:', typeof (global as any).localStorage);
  const noop = () => null;
  const noopObj = {
    getItem: noop,
    setItem: () => { },
    removeItem: () => { },
    clear: () => { },
    key: () => null,
    length: 0
  };

  if (typeof (global as any).localStorage !== 'object' || (global as any).localStorage === null || typeof (global as any).localStorage.getItem !== 'function') {
    console.log('[Supabase Server] Polyfilling localStorage');
    (global as any).localStorage = noopObj;
    (global as any).sessionStorage = noopObj;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjppucedebegvpgdqyyz.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqcHB1Y2VkZWJlZ3ZwZ2RxeXl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNTE0NzgsImV4cCI6MjA4NjYyNzQ3OH0.zZ9nXOFOnJUnkUtql7eAfeXjxAGVfrsRVnALmiMMNEM'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: isBrowser,
    storage: isBrowser ? window.localStorage : (global as any).localStorage,
  },
})

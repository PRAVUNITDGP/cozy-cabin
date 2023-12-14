import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://hkmffiofecpyvqcfiqfk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbWZmaW9mZWNweXZxY2ZpcWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE3OTcwNDYsImV4cCI6MjAxNzM3MzA0Nn0.SyTsjNHysVveY0k8tMEJqPXGUz-Da5sNROzKtde0Xiw"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://qcxwjaxybblitygzmwik.supabase.co'
const supabaseKey = "sb_publishable_nWASnykd-oJugW-H_C1ckA_87i851ST"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
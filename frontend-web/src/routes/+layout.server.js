import { supabase } from "$lib/supabase.js"

export async function load() {
    const [res1, res2, res3] = await Promise.all([
        supabase.from('quests').select('*').eq('complete', false),
        supabase.from('dailies').select('*').eq('complete', false),
        supabase.from('goals').select('*').eq('complete', false)
      ]);
    
      if (res1.error || res2.error || res3.error) {
        throw error(500, res1.error?.message || res2.error?.message || res3.error?.message);
      }
      return {
        quests: res1.data,
        dailies: res2.data,
        goals: res3.data
      }
}
import { createClient } from '@supabase/supabase-js';

export default (_context, inject) => {
  const URL = 'https://pvnyntuqgqafdtgzucqj.supabase.co';
  const KEY = process.env.supabaseKey;
  const supabase = createClient(URL, KEY);
  inject('supabase', supabase);
};
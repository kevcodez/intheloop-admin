import { createClient } from '@supabase/supabase-js';

export default (_context, inject) => {
  const URL = 'https://pvnyntuqgqafdtgzucqj.supabase.co';
  const KEY = process.env.INTHELOOP_SUPABASE_KEY;
  const supabase = createClient(URL, KEY);
  inject('supabase', supabase);
};
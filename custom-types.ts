import { SupabaseClient } from "@supabase/supabase-js";

declare module 'vue/types/vue' {
    interface Vue {
        $supabase: SupabaseClient
    }
}
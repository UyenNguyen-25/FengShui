import { supabase } from "@/utils/supabase";

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error };
  }

  return { success: true, error: null };
}

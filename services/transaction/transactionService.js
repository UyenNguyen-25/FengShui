import { supabase } from "@/utils/supabase";

export const transactionService = {
  getAll: async () => {
    try {
      const { data, error } = await supabase.from("transaction").select(`*,
        packageId(*), userId(*)`);

      console.log(data);

      if (error) {
        console.log("Get All from Transaction fail: ", error);
        return { success: false, msg: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },

  getByPackageId: async () => {},
  getByUserId: async () => {},
};

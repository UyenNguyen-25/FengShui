import { supabase } from "@/utils/supabase";

export const postService = {
  getAll: async () => {
    try {
      const { data, error } = await supabase.from("post").select(`*,
        userId(*)`);

      if (error) {
        console.log("Get All Post error: ", error);
        return { success: false, msg: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },
  getById: async (id) => {
    try {
      const { data, error } = await supabase
        .from("post")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.log("get post by id from db fail: ", error);
        return { success: false, msg: error.message };
      }
      return { success: true, data };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },
  insertPost: async (newData, userId) => {
    try {
      const { status, type_product, suit_element, image } = newData;

      const { error } = await supabase
        .from("post")
        .insert({ userId, status, type_product, suit_element, image });

      if (error) {
        console.log("insert post to db fail: ", error);
        return { success: false, msg: error.message };
      }
      return { success: true, newData };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },
  updatePost: async (id, newData) => {
    try {
      const { status, type_product, suit_element, image } = newData;

      const { error } = await supabase
        .from("post")
        .update({
          status,
          type_product,
          suit_element,
          image,
        })
        .eq("id", id);

      if (error) {
        console.log("update post to db fail: ", error);
        return { success: false, msg: error.message };
      }
      return { success: true, newData };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },
  deletePost: async (id) => {
    try {
      const response = await supabase.from("post").delete().eq("id", id);

      if (response.error) {
        console.log("delete post to db fail: ", response.error);
        return { success: false, msg: response.error.message };
      }
      return { success: true, data: response.data };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },
};

import { supabase } from "@/utils/supabase";

export const postService = {
  getAll: async () => {
    try {
      const { data, error } = await supabase.from("post").select("*");

      if (error) {
        console.log("Get All Post error: ", error);
        return { success: false, msg: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.log("Got error: ", error);
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
        console.log("Get post by id from db fail: ", error);
        return { success: false, msg: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.log("Got error: ", error);
      return { success: false, msg: error.message };
    }
  },

  insertPost: async (newData, userId) => {
    try {
      const { title, descrption, type, element, file } = newData;

      const { error } = await supabase
        .from("post")
        .insert({
          userId,
          title,
          descrption,
          type,
          element,
          file
        });

      if (error) {
        console.log("Insert post to db fail: ", error);
        return { success: false, msg: error.message };
      }

      return { success: true, newData };
    } catch (error) {
      console.log("Got error: ", error);
      return { success: false, msg: error.message };
    }
  },

  updatePost: async (id, newData) => {
    try {
      const { title, description, type, element, file } = newData;

      const { error } = await supabase
        .from("post")
        .update({
          title,
          description,
          type,
          element,
          file
        })
        .eq("id", id);

      if (error) {
        console.log("Update post to db fail: ", error);
        return { success: false, msg: error.message };
      }

      return { success: true, newData };
    } catch (error) {
      console.log("Got error: ", error);
      return { success: false, msg: error.message };
    }
  },

  deletePost: async (id) => {
    try {
      const response = await supabase.from("post").delete().eq("id", id);

      if (response.error) {
        console.log("Delete post to db fail: ", response.error);
        return { success: false, msg: response.error.message };
      }

      return { success: true, data: response.data };
    } catch (error) {
      console.log("Got error: ", error);
      return { success: false, msg: error.message };
    }
  },
};

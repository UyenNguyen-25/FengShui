import { supabase } from "@/utils/supabase";

export const blogService = {
  getAll: async () => {
    try {
      const { data, error } = await supabase.from("blog").select("*");

      if (error) {
        console.log("Get All Blog error: ", error);
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
        .from("blog")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.log("get blog by id from db fail: ", error);
        return { success: false, msg: error.message };
      }
      return { success: true, data };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },
  insertBlog: async (newData, userId) => {
    try {
      const { title, description, file, element, koi_id, pond_id } = newData;

      const { error } = await supabase
        .from("blog")
        .insert({ userId, title, description, file, element, koi_id, pond_id });

      if (error) {
        console.log("insert blog to db fail: ", error);
        return { success: false, msg: error.message };
      }
      return { success: true, newData };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },
  updateBlog: async (id, newData) => {
    try {
      const { title, description, file, element, koi_id, pond_id } = newData;

      const { error } = await supabase
        .from("blog")
        .update({
          title,
          description,
          file,
          element,
          koi_id,
          pond_id,
        })
        .eq("id", id);

      if (error) {
        console.log("update blog to db fail: ", error);
        return { success: false, msg: error.message };
      }
      return { success: true, newData };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },
  deleteBlog: async (id) => {
    try {
      const response = await supabase.from("blog").delete().eq("id", id);

      if (response.error) {
        console.log("delete blog to db fail: ", response.error);
        return { success: false, msg: response.error.message };
      }
      return { success: true, data: response.data };
    } catch (error) {
      console.log("got error: ", error);
      return { success: false, msg: error.message };
    }
  },
};

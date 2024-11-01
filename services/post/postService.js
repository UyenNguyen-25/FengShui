// post(
//   id,
//   userId,
//   title, //varchar,
//   description, //varchar,
//   file, //varchar,
//   suit_element, // enum('fire','water','wood','earth','metal')
//   created_at,
//   updated_at,
//   koi_id,
//   pond_id
// );

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
      const { title, description, file, element, koi_id, pond_id } = newData;

      const { error } = await supabase
        .from("post")
        .insert({ userId, title, description, file, element, koi_id, pond_id });

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
      const { title, description, file, element, koi_id, pond_id } = newData;

      const { error } = await supabase
        .from("post")
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

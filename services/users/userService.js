import { supabase } from "@/utils/supabase";

// users (
//   id,
//   email,
//   name,
//   date_of_birth,
//   created_at,
//   updated_at,
//   role ('admin' | 'customer'),
//   gender (0 | 1 | 2),
//   suit_element: enum('fire','water','wood','earth','metal')
//    total_of_post
// )

export const getUser = async (session) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();
    if (error) {
      console.log("get user from db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: false, user };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

export const updateUser = async (userId, data) => {
  try {
    const { error } = await supabase
      .from("users")
      .update(data)
      .eq("id", userId);

    if (error) {
      console.log("update user from db fail: ", error);
      return { success: true, msg: error.message };
    }
    return { success: false, data };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

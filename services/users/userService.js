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
//    total_post
// )

const getUser = async (session) => {
  try {
    console.log(session.user.id);

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();
    if (error) {
      console.log("get user from db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, user };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const getUserById = async (userId) => {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("name")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("get user by id from db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, user };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const updateNumOfPost = async (userId, incrementBy) => {
  try {
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("total_post")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.log("Lỗi khi lấy thông tin người dùng: ", fetchError);
      return { success: false, msg: fetchError.message };
    }

    const newTotalOfPost = (userData.total_post || 0) + incrementBy;

    const { error } = await supabase
      .from("users")
      .update({ total_post: newTotalOfPost })
      .eq("id", userId);

    if (error) {
      console.log("Cập nhật total_post thất bại: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, total_post: newTotalOfPost };
  } catch (error) {
    console.log("Lỗi xảy ra: ", error);
    return { success: false, msg: error.message };
  }
};


const updateTotalPosts = async (userId, decrementBy = 1) => {
  try {
    const { data: userData, error: fetchError } = await supabase
      .from("users")
      .select("total_post")
      .eq("id", userId)
      .single();

    if (fetchError) {
      console.log("Lỗi khi lấy thông tin người dùng: ", fetchError);
      return { success: false, msg: fetchError.message };
    }

    const newTotalOfPost = (userData.total_post || 0) - decrementBy;

    // Kiểm tra xem total_post có đủ để trừ hay không
    if (newTotalOfPost < 0) {
      return { success: false, msg: "Không đủ bài viết để giảm." };
    }

    const { error } = await supabase
      .from("users")
      .update({ total_post: newTotalOfPost })
      .eq("id", userId);

    if (error) {
      console.log("Cập nhật total_post thất bại: ", error);
      return { success: false, msg: error.message };
    }

    return { success: true };
  } catch (error) {
    console.log("Lỗi xảy ra: ", error);
    return { success: false, msg: error.message };
  }
};

const checkTotalPosts = async (userId) => {
  try {
    // Fetch user data to get the total_post
    const { data: userData, error } = await supabase
      .from("users")
      .select("total_post")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("Lỗi khi lấy thông tin người dùng: ", error);
      return { success: false, msg: "Không thể lấy thông tin người dùng." };
    }

    // Check if user has remaining posts
    if (userData.total_post <= 0) {
      return { success: false, msg: "Bạn không còn bài viết để đăng." };
    }

    // If there are remaining posts, return success
    return { success: true, msg: "Có thể đăng bài." };
  } catch (error) {
    console.log("Lỗi xảy ra khi kiểm tra total_post: ", error);
    return { success: false, msg: error.message };
  }
};

const updateUser = async (id, data) => {
  try {
    console.log("data: ", data);

    const { error } = await supabase.from("users").update(data).eq("id", id);

    if (error) {
      console.log("update user from db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

export const userService = { getUser, updateUser, getUserById, updateNumOfPost, updateTotalPosts, checkTotalPosts };

import { supabase } from "@/utils/supabase";

const getAll = async () => {
  try {
    const { data, error } = await supabase.from("package").select("*");

    if (error) {
      console.log("Get All from Package fail: ", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const getById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("package")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log("Get All from Package fail: ", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const insertPackage = async (newData) => {
  try {
    const { name, price, num_of_post } = newData;

    const { error } = await supabase
      .from("package")
      .insert({ name, price, num_of_post });

    if (error) {
      console.log("insert package to db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, newData };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const updatePackage = async (id, newData) => {
  try {
    const { name, price, num_of_post } = newData;

    const { error } = await supabase
      .from("package")
      .update({
        name,
        price,
        num_of_post,
      })
      .eq("id", id);

    if (error) {
      console.log("update package to db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, newData };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const deletePackage = async (id) => {
  try {
    const response = await supabase.from("package").delete().eq("id", id);

    if (response.error) {
      console.log("delete post from db fail: ", response.error);
      return { success: false, msg: response.error.message };
    }
    return { success: true, data: response.data };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

export const packageService = {
  getAll,
  getById,
  insertPackage,
  updatePackage,
  deletePackage,
};

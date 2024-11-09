import { supabase } from "@/utils/supabase";

const getAll = async () => {
  try {
    const { data, error } = await supabase.from("ponds").select("*");

    if (error) {
      console.log("Get All from Ponds fail: ", error);
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
      .from("ponds")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log("Get All from Ponds fail: ", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const getListByElement = async (element) => {
  try {
    const { data, error } = await supabase
      .from("ponds")
      .select("*")
      .eq("suit_element", element);

    if (error) {
      console.log("Get All from ponds fail: ", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const insertPond = async (newData) => {
  try {
    const { pond_shape, pond_direction, pond_location, suit_element } = newData;

    const { error } = await supabase
      .from("ponds")
      .insert({ pond_shape, pond_direction, pond_location, suit_element });

    if (error) {
      console.log("insert ponds to db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, newData };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const updatePond = async (id, newData) => {
  try {
    const { pond_shape, pond_direction, pond_location } = newData;

    const { error } = await supabase
      .from("ponds")
      .update({ pond_shape, pond_direction, pond_location })
      .eq("id", id);

    if (error) {
      console.log("update ponds to db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, newData };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const deletePond = async (id) => {
  try {
    const response = await supabase.from("ponds").delete().eq("id", id);

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

export const pondsService = {
  getAll,
  getById,
  getListByElement,
  insertPond,
  updatePond,
  deletePond,
};

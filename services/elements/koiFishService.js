// koiFish (
//     id,
//     created_at,
//     name,
//     origin,
//     suit_element: enum('fire','water','wood','earth','metal')
// )

import { supabase } from "@/utils/supabase";

const getAll = async () => {
  try {
    const { data, error } = await supabase.from("koiFish").select("*");

    if (error) {
      console.log("Get All from KoiFish fail: ", error);
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
      .from("koiFish")
      .select("*")
      .eq("id", id);

    if (error) {
      console.log("Get data from KoiFish fail: ", error);
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
      .from("koiFish")
      .select("*")
      .eq("suit_element", element);

    if (error) {
      console.log("Get All from KoiFish fail: ", error);
      return { success: false, msg: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const insertKoiFish = async (newData) => {
  try {
    const { name, origin, suit_element, color, quantity } = newData;

    const { error } = await supabase
      .from("koiFish")
      .insert({ name, origin, suit_element, color, quantity });

    if (error) {
      console.log("insert koiFish to db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, newData };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const updateKoiFish = async (id, newData) => {
  try {
    const { name, origin, suit_element, color, quantity } = newData;

    const { error } = await supabase
      .from("koiFish")
      .update({ name, origin, suit_element, color, quantity })
      .eq("id", id);

    if (error) {
      console.log("update koiFish to db fail: ", error);
      return { success: false, msg: error.message };
    }
    return { success: true, newData };
  } catch (error) {
    console.log("got error: ", error);
    return { success: false, msg: error.message };
  }
};

const deleteKoiFish = async (id) => {
  try {
    const response = await supabase.from("koiFish").delete().eq("id", id);

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

export const koiFishService = {
  getAll,
  getById,
  getListByElement,
  insertKoiFish,
  updateKoiFish,
  deleteKoiFish,
};

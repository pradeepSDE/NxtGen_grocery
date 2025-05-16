
import axios from "axios";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../slices/adminUserSlice";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());
    const response = await axios.get("/api/admin/users"); // Adjust endpoint as per your API
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.response?.data?.message || error.message));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await axios.delete(`/api/admin/users/${userId}`); // Adjust endpoint as per your API
    dispatch(fetchAllUsers());
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
